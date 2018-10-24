import { Injectable } from '@angular/core';
@Injectable()

export class baseConfig {

    //prod
    private baseUrl = 'http://126.10.9.207:8182/app'
    //debug
    // private baseUrl = '/api'
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