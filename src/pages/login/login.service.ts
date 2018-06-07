import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptionsArgs, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx'
import { baseConfig } from '../../core/service/baseConfig.service';
import { ApiUrlService } from '../../core/service/apiUrl.service';
import { httpHanldeService } from '../../core/service/httpHandle.service';

@Injectable()

export class LoginService {
    constructor(
        private http: Http,
        private _baseConfig: baseConfig,
        private _ApiUrlService: ApiUrlService,
        private _httpHanldeService : httpHanldeService
    ) {

    }

    login(parameter: any): Promise<any> {
        let params = new URLSearchParams();
        params.set('loginName', parameter.username);
        params.set('password', parameter.password);        
        return this.http.get(this._baseConfig.getBaseUrl() + this._ApiUrlService['login'], { search: params })
            .toPromise()
            .then(res =>
                this._httpHanldeService.extractDataSuccess(res)
            )
            .catch(error =>
                this._httpHanldeService.handleError(error)
            );
    }
}