import { Injectable } from '@angular/core';
@Injectable()

export class baseConfig {

    //prod
    // private baseUrl = 'http://127.0.0.1:8010'
    //debug
    private baseUrl = '/appapi'
    getBaseUrl(){
        return this.baseUrl
    }

    getwisonSearchUrl(){
        return false
    }

    getpreviewUrl(){
        return false
    }
}