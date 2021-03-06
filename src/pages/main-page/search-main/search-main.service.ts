import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

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

    async getArchivesList(parameters): Promise<any> {
        let params = new URLSearchParams();        
        params.set('keywords',parameters.keywords.replace(/\s+/g, ""))
        params.set('locale','zh_CN')
        params.set('pageSize',parameters.pageSize)
        params.set('currentPage',parameters.currentPage)        
        params.set('archiveCode',parameters.parentId)        
        return this.http.get(this._baseConfig.getBaseUrl() + this._ApiUrlService['getArchivesList'],{search:params})
            .toPromise()
            .then(res =>
                this._httpHanldeService.extractData(res)
            )
            .catch(error =>
                this._httpHanldeService.handleError(error)
            );
    }

    async getFileList(parameters): Promise<any> {        
        let params = new URLSearchParams();        
        params.set('keywords',parameters.keywords.replace(/\s+/g, ""))
        params.set('locale','zh_CN')
        params.set('pageSize',parameters.pageSize)
        params.set('currentPage',parameters.currentPage)        
        params.set('archiveCode',parameters.parentId)
        return this.http.get(this._baseConfig.getBaseUrl() + this._ApiUrlService['getFileList'],{search:params})
            .toPromise()
            .then(res =>
                this._httpHanldeService.extractData(res)
            )
            .catch(error =>
                this._httpHanldeService.handleError(error)
            );
    }

    async getPreviewToken(info): Promise<any> {        
        let params = new URLSearchParams();
  
        params.set('locale','zh_CN')
        for(let key in info){
            params.set(key,info[key])
        }
        return this.http.get(this._baseConfig.getBaseUrl() + this._ApiUrlService['getPreviewToken'],{search:params})
            .toPromise()
            .then(res =>
                this._httpHanldeService.extractData(res)
            )
            .catch(error =>
                this._httpHanldeService.handleError(error)
            );
    }

    async getPdfPreviewPath(info): Promise<any> {        
        let params = new URLSearchParams();
      
        params.set('locale','zh_CN')
        for(let key in info){
            params.set(key,info[key])
        }
        return this.http.get(this._baseConfig.getBaseUrl() + this._ApiUrlService['getPdfPreviewPath'],{search:params})
            .toPromise()
            .then(res =>
                this._httpHanldeService.extractData(res)
            )
            .catch(error =>
                this._httpHanldeService.handleError(error)
            );
    }

    async getElectronicRecord(id): Promise<any> {        
        let params = new URLSearchParams();
      
        params.set('locale','zh_CN')
        params.set('fileId',id)
        return this.http.get(this._baseConfig.getBaseUrl() + this._ApiUrlService['getElectronicRecord'],{search:params})
            .toPromise()
            .then(res =>
                this._httpHanldeService.extractData(res)
            )
            .catch(error =>
                this._httpHanldeService.handleError(error)
            );
    }

    async getEleId(id): Promise<any> {        
        let params = new URLSearchParams();
       
        params.set('locale','zh_CN')
        params.set('id',id)
        return this.http.get(this._baseConfig.getBaseUrl() + this._ApiUrlService['getEleId'],{search:params})
            .toPromise()
            .then(res =>
                this._httpHanldeService.extractData(res)
            )
            .catch(error =>
                this._httpHanldeService.handleError(error)
            );
    }
    
    async getPdf(id): Promise<any> {                                
        let params = new URLSearchParams();    
        params.set('id',id)        
        params.set('type','download')             
        return this.http.get(       
           'http://21.15.116.51/seas/viewServlet.do'
           ,{search:params,responseType:2})
            .toPromise()
            .then(res =>
                Promise.resolve(res)
            )
            .catch(error => 
                this._httpHanldeService.handleError(error)
            );
    }
}