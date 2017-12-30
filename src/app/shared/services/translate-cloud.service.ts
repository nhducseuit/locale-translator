import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const GGLE_CLOUD_TRANSLATE_API_BASE_URL = 'https://translation.googleapis.com';
const API_VERSION_CODE = 'v2';
const OAUTH2_TOKEN_INFO_ENDPOINT = 'https://www.googleapis.com/oauth2/v3/tokeninfo';

@Injectable()
export class TranslateCloudService {
private headers: HttpHeaders = new HttpHeaders();
constructor(private httpClient: HttpClient) { }

public updateAuthorizationHeader(auth) {
    this.headers = this.headers.set('Authorization', auth);
}

public translate(text: string, targetLoc: string): Observable<any> {
    return this.httpClient.post(this.getTranslateURL(),
    {
        q: text,
        target: targetLoc,
        format: 'text',
    },
    {
        headers: this.headers.set('Content-Type', 'application/json')
    });
}

public translateMulti(texts: string[], targetLoc: string): any {
    console.log("Translated array", texts);
    return this.httpClient.post(this.getTranslateURL(),
    {
        q: texts,
        target: targetLoc,
        format: 'text'
    },
    {
        headers: this.headers.set('Content-Type', 'application/json')
    })
    .subscribe(
        result => console.log(result),
        err => console.error(err)
    );
}

public getTokenInfo(token: string): Observable<any> {
    return this.httpClient.post(this.getValidateTokenURL(token), null);
}

private getTranslateURL() {
    return `${GGLE_CLOUD_TRANSLATE_API_BASE_URL}/language/translate/${API_VERSION_CODE}`;
}
private getValidateTokenURL(token: string): string {
    return `${OAUTH2_TOKEN_INFO_ENDPOINT}?access_token=${token}`;
}

}
