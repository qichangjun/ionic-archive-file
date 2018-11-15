import { Injectable } from '@angular/core';
@Injectable()

export class ApiUrlService {
    search = '/search/full_text';
    // getFileList = '/navigation/list';
    getFileInfo = '/attribute/get_attributes';
    getPdf = '/file/previewtest'
    
    getArchivesList = '/record/zjny/list';
    login = '/user/zjny/login?';
    getFileList = '/file/zjny/list';
    getDocBaseLists = '/user/zjny/lib/list';

    getUrlById = '/file/zjny/getElecFileId'
    
    getEleId = '/file/zjny/getElecFileId'
    getPreviewToken = '/filepreview/getPreviewToken'
    getElectronicRecord = '/file/zjny/getElectronicRecord'
    getPdfPreviewPath = '/filepreview/getPdfPreviewPath'

}