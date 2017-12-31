import { GetSupportedLanguagesResponseLanguage } from './../shared/models/get-supported-languages-response-language';
import { TranslationEntity } from './../shared/models/translation-entity';
import { FileUploadComponent } from './../shared/components/file-upload/file-upload.component';
import { Observable } from 'rxjs/Observable';
import { TranslateCloudService } from './../shared/services/translate-cloud.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { LocalStorageService } from '../shared/services/local-storage.service';
import 'rxjs/add/operator/catch';
import { transformMenu } from '@angular/material/menu/typings/menu-animations';
import { saveAs } from 'file-saver/FileSaver';

const GGLE_AUTH_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth';
const OAUTH2_TOKEN_INFO_ENDPOINT = 'https://www.googleapis.com/oauth2/v3/tokeninfo';
const GGLE_CLIENT_ID = '567655701812-9hrd4nujj50lqc45dc88cqamdjdl4dv4.apps.googleusercontent.com';

@Component({
  selector: 'dnh-properties-file-translator',
  templateUrl: './properties-file-translator.component.html',
  styleUrls: ['./properties-file-translator.component.scss']
})
export class PropertiesFileTranslatorComponent implements OnInit, AfterViewInit {
  @ViewChild('fileUploadCmp') fileUploadCmp: FileUploadComponent;
  public shouldShowProgressBar = false;
  public readTexts: Array<TranslationEntity>;
  public translatedTexts: Array<TranslationEntity>;
  public translated = false;
  public supportedLanguages: GetSupportedLanguagesResponseLanguage[] = [];
  public targetLanguageCode: string;
  private translationEntities: Array<TranslationEntity>;
  constructor(private translateSvc: TranslateCloudService, private localStorage: LocalStorageService) { }
  
  ngOnInit() {
  }
  
  ngAfterViewInit(): void {
    this.startProgress('Verifying tranlsation endpoints permission...')
    const accessToken = this.getAccessToken();
    if (accessToken) {
      this.validateToken(accessToken);
    } else {
      this.finishProgress();
    }
  }

  private startProgress(msg?: string) {
    this.shouldShowProgressBar = true;
    if (this.fileUploadCmp && msg) {
      this.fileUploadCmp.greeting = msg;
    }
  }

  private finishProgress(msg?: string) {
    this.shouldShowProgressBar = false;
    if (this.fileUploadCmp && msg) {
      this.fileUploadCmp.greeting = msg;
    }
  }

  public disabledOverlayClicked() {
    this.auth();
  }

  public fileRead(fileContent: TranslationEntity[]) {
    this.readTexts = fileContent;
    const commentRegex = /^\#.*$/;
    this.translationEntities = fileContent.filter(transSrc => transSrc.needTranslation)
      .map(transSrc => {
        const fragments = transSrc.originLine.split('=');
        transSrc.key = fragments[0];
        transSrc.value = fragments[1];
        return transSrc;
      });
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
          this.localStorage.storeStringItem('Authorization', accessToken);
          this.translateSvc.updateAuthorizationHeader('Bearer ' + accessToken);
          this.enableFileUpload();
          this.finishProgress('Permission granted. Enjoy!');
          this.getSupportedLanguages();
        } else {
          console.log('Token {} is invalid', accessToken);
          this.finishProgress('Permission granted. Enjoy!');
        }
      },
      err => {
        console.error('Token is invalid: {}', accessToken, err);
        this.localStorage.removeItem('Authorization');
        this.finishProgress('Ops! Translation endpoints permission is not granted.');
        this.disableFileUpload();
      })
    }
  }

  private getSupportedLanguages(): void {
    this.startProgress();
    this.translateSvc.getSupportedLanguages().subscribe((languages: GetSupportedLanguagesResponseLanguage[]) => {
      this.supportedLanguages = languages;
      this.finishProgress();
    },
  err => {
    console.error('Failed to get list of supported languages', err);
    this.finishProgress();
  });
  }

  private enableFileUpload(msg?: string) {
    if (this.fileUploadCmp) {
      this.fileUploadCmp.disabled = false;
      if (msg) {
        this.changeFileUploadGreeting(msg);
      }
    }
  }

  private disableFileUpload(msg?: string) {
    if (this.fileUploadCmp) {
      this.fileUploadCmp.disabled = true;
      if (msg) {
        this.changeFileUploadGreeting(msg);
      }
    }
  }

  private changeFileUploadGreeting(msg: string) {
    this.fileUploadCmp.greeting = msg;
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

  public translate() {
    if (this.targetLanguageCode) {
      const texts = this.translationEntities.map(entity => entity.value);
      this.translateSvc.translateMulti(texts, this.targetLanguageCode)
        .subscribe((translatedTexts: string[]) => {
          this.translationEntities = this.translationEntities.map((value, number, _) => {
            if (!value.translated) {
              value.translated = new Map<string, string>();
            }
            value.translated.set(this.targetLanguageCode, translatedTexts[number]);
            return value;
          });
          // Translation finished, set translated flag to true and prepare the translatedTexts ready to show user or save to file
          this.translated = true;
          this.prepareTranslatedTexts();
        },
        err => console.error(err));
    }
  }

  public saveTranslated() {
    const fileBlob = this.buildFile(this.targetLanguageCode);
    const fileName = `${this.targetLanguageCode}.properties`;
    saveAs(fileBlob, fileName);
  }

  public viewTranslated() {

  }

  private prepareTranslatedTexts() {
    // Reset translated texts as a copy of readTexts
    this.translatedTexts = [...this.readTexts];
    // Update the translatedTexts with translatedEntities
    const translationEntitiesEntries = this.translationEntities.entries();
    const translatedTextEntries = this.translatedTexts.entries();
    let entry: IteratorResult<[number, TranslationEntity]>;
    let translationEntry: IteratorResult<[number, TranslationEntity]>;
    for(entry = translatedTextEntries.next(), translationEntry = translationEntitiesEntries.next(); !entry.done && !translationEntry.done;) {
      if (entry.value[1].index === translationEntry.value[1].index) {
        entry.value[1] = { ...translationEntry.value[1] };
        entry = translatedTextEntries.next();
        translationEntry = translationEntitiesEntries.next();
      } else {
        entry = translatedTextEntries.next();
      }
    }
    console.log('prepareTranslatedTexts... translatedTexts', this.translatedTexts);
  }

  private buildFile(targetLocale: string): Blob {
    if (this.translatedTexts) {
      const lines: string[] = this.translatedTexts.map((entity: TranslationEntity) => {
        if (entity.needTranslation) {
          return `${entity.key}=${entity.translated.get(targetLocale)}`;
        } else {
          return entity.originLine;
        }
      });
      return new Blob(lines, {type: 'text/plain'});
    } else {
      throw('No source texts to build file!');
    }
  }
}
