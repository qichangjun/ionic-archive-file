import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptionsArgs, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx'
import { baseConfig } from '../../../core/service/baseConfig.service';
import { ApiUrlService } from '../../../core/service/apiUrl.service';
import { httpHanldeService } from '../../../core/service/httpHandle.service';
import { storageInfoService } from '../../../core/service/storageInfo.service';

@Injectable()

export class SearchMainService {
    constructor(
        private http: Http,
        private _baseConfig: baseConfig,
        private _ApiUrlService: ApiUrlService,
        private _httpHanldeService: httpHanldeService,
        private _storageInfoService: storageInfoService
    ) {

    }

    async search(keywords: string, currentPage): Promise<any> {
        let params = new URLSearchParams();
        let userInfo = await this._storageInfoService.getAuthInfo()
        params.set('accessUser', userInfo.accessUser);
        params.set('accessToken', userInfo.accessToken);
        let post_data = { "pageBean": { "currentPage": currentPage, "pageSize": 20 }, "searchBean": { "searchBeanList": [{ "searchBeanList": [{ "name": "important_attribute", "value": keywords, "facet": true, "highlight": true, "lineType": 0, "type": 0 }], "lineType": "||" }, { "searchBeanList": [{ "name": "repository", "value": "wison_company", "facet": true, "highlight": true, "lineType": 0, "type": 0 }, { "name": "repository", "value": "wison_projects", "facet": true, "highlight": true, "lineType": 0, "type": 0 }], "lineType": "||" }], "lineType": "&&" }, "specialField": { "facetList": [{ "name": "知识分类", "field": "w_knw_subcategory", "type": "3" }, { "name": "内容性质", "field": "w_content_kind", "type": "1" }, { "name": "文档格式", "field": "format", "type": "1" }] } }
        return this.http.post(this._baseConfig.getwisonSearchUrl() + this._ApiUrlService['search'], post_data, { search: params })
            .toPromise()
            .then(res =>
                this._httpHanldeService.extractData(res)
            )
            .catch(error =>
                this._httpHanldeService.handleError(error)
            );
    }

    async getFileInfo(docbase, objectId): Promise<any> {
        let params: URLSearchParams = new URLSearchParams();
        let userInfo = await this._storageInfoService.getAuthInfo()
        params.set('accessUser', userInfo.accessUser);
        params.set('accessToken', userInfo.accessToken);
        params.set('docbase', docbase);
        params.set('objectId', objectId);
        params.set('option', '1');
        return this.http.get(this._baseConfig.getBaseUrl() + this._ApiUrlService['getFileInfo'], { search: params })
            .toPromise()
            .then(res =>
                this._httpHanldeService.extractData(res)
            )
            .catch(error =>
                this._httpHanldeService.handleError(error)
            );
    }

    async getList(parameters): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let info = Object.assign({}, parameters);
        let params = new URLSearchParams();
        let userInfo = await this._storageInfoService.getAuthInfo()
        params.set('parentId', parameters.parentId)
        params.set('docbase', info.docbase)
        params.set('accessToken', userInfo.accessToken)
        params.set('accessUser', userInfo.accessUser)
        params.set('type', parameters.type)
        let post_data = { orders: [], length: info.pageSize, page: info.currentPage, columns: [] }
        let orders = [];
        if (parameters.type == 2 || parameters.type == 3) {
            orders.push({ direction: 'asc', column: 'r_object_type' })
        }
        if (parameters.dir && parameters.prop) {
            orders.push({ direction: parameters.dir, column: parameters.prop })
        } else {
            orders.push({ direction: 'asc', column: 'object_name' })
        }
        post_data.orders = orders
        if (parameters.object_name) {
            post_data.columns.push({
                "name": "object_name",
                "predicate": "LIKE",
                "type": "string",
                "value": parameters.object_name
            })
        }
        return this.http.post(this._baseConfig.getBaseUrl() + this._ApiUrlService['getFileList'] + '?' + params, JSON.stringify(post_data), options)
            .toPromise()
            .then(res =>
                this._httpHanldeService.extractData(res)
            )
            .catch(error =>
                this._httpHanldeService.handleError(error)
            );
    }
}