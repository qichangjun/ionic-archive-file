import { Injectable } from '@angular/core';
@Injectable()

export class baseConfig {

    //prod
    // private baseUrl = 'http://10.150.156.40:6233/app'
    //debug
    // private baseUrl = '/appapi'
    private baseUrl = 'http://192.168.0.153:6233/app'
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