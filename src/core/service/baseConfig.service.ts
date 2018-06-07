import { Injectable } from '@angular/core';
@Injectable()

export class baseConfig {
    private baseUrl = 'http://kmdoc.wison.com/edmsapi'
    private wisonsearchUrl = 'http://kmdoc.wison.com/wisonsearchapi'
    private previewUrl = 'http://kmdoc.wison.com/docview/#!/?'

    // private baseUrl = '/edmsapi'
    // private wisonsearchUrl = '/wisonsearchapi'
    getBaseUrl(){
        return this.baseUrl
    }

    getwisonSearchUrl(){
        return this.wisonsearchUrl
    }

    getpreviewUrl(){
        return this.previewUrl
    }
}