import { FileUploadComponent } from './../shared/components/file-upload/file-upload.component';
import { Observable } from 'rxjs/Observable';
import { TranslateCloudService } from './../shared/services/translate-cloud.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { LocalStorageService } from '../shared/services/local-storage.service';

const GGLE_AUTH_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth';
const OAUTH2_TOKEN_INFO_ENDPOINT = 'https://www.googleapis.com/oauth2/v3/tokeninfo';
const GGLE_CLIENT_ID = '567655701812-9hrd4nujj50lqc45dc88cqamdjdl4dv4.apps.googleusercontent.com';

@Component({
  selector: 'dnh-properties-file-translator',
  templateUrl: './properties-file-translator.component.html',
  styleUrls: ['./properties-file-translator.component.scss']
})
export class PropertiesFileTranslatorComponent implements OnInit, AfterViewInit {
  private authenticated = false;
  @ViewChild('fileUploadCmp') fileUploadCmp: FileUploadComponent;
  constructor(private translateSvc: TranslateCloudService, private localStorage: LocalStorageService) { }
  
  ngOnInit() {
    const accessToken = this.getAccessToken();
    if (accessToken) {
      this.validateToken(accessToken);
    }
  }
  
  ngAfterViewInit(): void {
    this.fileUploadCmp.disabled = !this.authenticated;
  }

  public disabledOverlayClicked() {
    this.auth();
  }

  public fileRead(fileContent: Map<string, string>) {
    this.translateSvc.translateMulti(Array.from(fileContent.values()), 'vi');
  }

  private getAccessToken(): string {
    const accessToken = localStorage.getItem('Authorization');
    if (accessToken) 
      return accessToken;
  
    const queryString = location.hash.substring(1);
    if (queryString) {
      const params = {};
      const regex = /([^&=]+)=([^&]*)/g;
      let m;
      while (m = regex.exec(queryString)) {
        params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
      }
      return params['access_token'];
    }
    return accessToken;
  }

  private validateToken(accessToken: any): any {
    if (accessToken) {
      this.translateSvc.getTokenInfo(accessToken).subscribe(result => {
        if (result && result.aud === GGLE_CLIENT_ID) {
          this.authenticated = true;
          this.localStorage.storeStringItem('Authorization', accessToken);
          this.translateSvc.updateAuthorizationHeader('Bearer ' + accessToken);

          if (this.fileUploadCmp) {
            this.fileUploadCmp.disabled = !this.authenticated;
          }
        } else {
          console.log('Token {} is invalid', accessToken);
        }
      },
      err => {
        console.log('Invalid access token');
        this.localStorage.removeItem('Authorization');
      })
    }
  }

  private auth() {
    const redirect_uri = window.location.origin + '/index.html';
    const params = new URLSearchParams();
    params.set('client_id', GGLE_CLIENT_ID);
    params.set('redirect_uri', window.location.origin);
    params.set('response_type', 'token');
    params.set('scope', 'https://www.googleapis.com/auth/cloud-platform');
    const targetURL = `${GGLE_AUTH_ENDPOINT}?${params.toString()}`;
    window.open(targetURL);
  }
}
