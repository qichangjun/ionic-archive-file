import { Injectable } from '@angular/core';
@Injectable()

export class ApiUrlService {
    search = '/search/full_text';
    // getFileList = '/navigation/list';
    getFileInfo = '/attribute/get_attributes';
    getPdf = '/file/previewtest'
    
    getArchivesList = '/search/zjny/records';
    login = '/user/zjny/login?';
    getFileList = '/search/zjny/files';
    getDocBaseLists = '/user/zjny/lib/list';
}