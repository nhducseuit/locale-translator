import { GetSupportedLanguagesResponseLanguage } from './../models/get-supported-languages-response-language';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

const GGLE_CLOUD_TRANSLATE_API_BASE_URL = 'https://translation.googleapis.com';
const API_VERSION_CODE = 'v2';
const OAUTH2_TOKEN_INFO_ENDPOINT = 'https://www.googleapis.com/oauth2/v3/tokeninfo';
const DEFAULT_TRANSLATION_MODEL = 'base'; //PBMT
const DEFAULT_LANGUAGE_CODE = 'en';

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

public translateMulti(texts: string[], targetLoc: string): Observable<string[]>{
    return this.httpClient.post(this.getTranslateURL(),
    {
        q: texts,
        target: targetLoc,
        format: 'text'
    },
    {
        headers: this.headers.set('Content-Type', 'application/json')
    })
    .map((result:any) => result.data.translations.map(translation => translation.translatedText))
    .catch(err => Observable.throw(err));
}

public getSupportedLanguages(): Observable<GetSupportedLanguagesResponseLanguage[]>{
    return this.httpClient.get(this.getSupportedLanguagesEndpointURL(),
    {
        headers: this.headers,
        params: {
            target: DEFAULT_LANGUAGE_CODE,
            model: DEFAULT_TRANSLATION_MODEL
        }
    })
    .map((result: any) => result.data.languages)
    .catch(err => Observable.throw(err));
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
private getSupportedLanguagesEndpointURL(): string {
    return `${GGLE_CLOUD_TRANSLATE_API_BASE_URL}/language/translate/${API_VERSION_CODE}/languages`;
}

}
