import { Injectable } from '@angular/core';
@Injectable()

export class ApiUrlService {
    login = '/user/login';
    search = '/search/full_text';
    getArchivesList = '/record/list';
    // getFileList = '/navigation/list';
    getFileInfo = '/attribute/get_attributes';
    getFileList = '/file/ghj/list';
    getPdf = '/file/previewtest'
    getEleId = '/file/getElecFileId'
    getPreviewToken = '/filepreview/getPreviewToken'
    getElectronicRecord = '/file/getElectronicRecord'
    getPdfPreviewPath = '/filepreview/getPdfPreviewPath'
}