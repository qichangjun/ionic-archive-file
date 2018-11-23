import { Injectable } from '@angular/core';
@Injectable()

export class baseConfig {

    //prod
    private baseUrl = 'http://10.150.152.10:7080/appapi'
    // private baseUrl = 'http://192.168.0.153:8080/app'
    //debug
    // private baseUrl = '/appapi'
    //local-prod
    // private baseUrl = 'http://192.168.0.153:6233/app'
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