import { MatProgressBarModule } from '@angular/material';
import { GetSupportedLanguagesResponseLanguage } from './../models/get-supported-languages-response-language';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

const GGLE_CLOUD_TRANSLATE_API_BASE_URL = 'https://translation.googleapis.com';
const API_VERSION_CODE = 'v2';
const OAUTH2_TOKEN_INFO_ENDPOINT = 'https://www.googleapis.com/oauth2/v3/tokeninfo';
const DEFAULT_TRANSLATION_MODEL = 'base'; //PBMT
const DEFAULT_LANGUAGE_CODE = 'en';
const MAX_MULTI_TEXT_2B_TRANSLATED = 128;

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
    let startIdx = 0;
    let endIdx = 0;
    // Split the search texts into segments to not exceeds maximum amount of texts sent in one translation request
    let textsSegments = [];
    while(endIdx < texts.length) {
        startIdx = endIdx;
        endIdx = (startIdx + MAX_MULTI_TEXT_2B_TRANSLATED > texts.length) 
                    ? texts.length 
                    : startIdx + MAX_MULTI_TEXT_2B_TRANSLATED;
        textsSegments.push([texts.slice(startIdx, endIdx), targetLoc, startIdx, endIdx]);
    }
    // Send multiple translation requests for each segment
    // Fork then join the translation result emitted from each single translation request,
    // so the translation results of all segments are gathered and mapped into one single translated texts array
    return Observable.forkJoin(...textsSegments.map(segment => {
        return this.doTranslateMultipleTexts(segment[0], segment[1], segment[2], segment[3]);
    }))
    .map((joinedResult: Array<any>) => {
        // Sort based on start index of corresponding segment, before reduce (flatten) results into one single array
        return joinedResult.sort((a, b) => a[1] > b[1] ? 1 : -1).reduce((prev, curr) => {
            if (!Array.isArray(prev)) {
                prev = [];
            }
            prev.push(...curr[0]);
            return prev;
        }, []);
    });
}

private doTranslateMultipleTexts(texts: string[], targetLoc: string, startIdx: number, endIdx: number): Observable<any>{
    return this.httpClient.post(this.getTranslateURL(),
    {
        q: texts,
        target: targetLoc,
        format: 'text'
    },
    {
        headers: this.headers.set('Content-Type', 'application/json')
    })
    .map((result: any) =>  {
        return [
                result.data.translations.map(translation => translation.translatedText), 
                startIdx, 
                endIdx
            ];
    })
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
