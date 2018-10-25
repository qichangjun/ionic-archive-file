import { Injectable } from '@angular/core';
@Injectable()

export class ApiUrlService {
    search = '/search/full_text';
    // getFileList = '/navigation/list';
    getFileInfo = '/attribute/get_attributes';
    getPdf = '/file/previewtest'
    
    getArchivesList = '/records/list';
    login = '/user/zjny/login?';
    getFileList = '/file/zjny/list';
    getDocBaseLists = '/user/zjny/lib/list';

    getUrlById = '/file/getElecFileId'
    
    getEleId = '/file/getElecFileId'
    getPreviewToken = '/file/getPreviewToken'
    getElectronicRecord = '/file/getElectronicRecord'
    getPdfPreviewPath = '/file/getPdfPreviewPath'

}