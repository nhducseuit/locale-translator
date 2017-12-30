import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
    
private values: Object = {};

constructor() { }

public loadItem(key: string): any {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (e) {
        return this.values[key] ? JSON.parse(this.values[key]) : null;
    }
}

public removeItem(key: string): any {
    localStorage.removeItem(key);
}

public storeItem(key: string, values: Object): void {
    const stringValue = JSON.stringify(values);
    try {
        localStorage.setItem(key, stringValue);
    } catch (e) {
        this.values[key] = stringValue;
    }
}

public storeStringItem(key: string, values: string): void {
    try {
        localStorage.setItem(key, values);
    } catch (e) {
        this.values[key] = values;
    }
}

}