import { Injectable } from '@angular/core';
@Injectable()

export class ApiUrlService {
    login = '/user/zjny/login?';
    search = '/search/full_text';
    getArchivesList = '/search/common';
    // getFileList = '/navigation/list';
    getFileInfo = '/attribute/get_attributes';
    getFileList = '/file/list';
    getPdf = '/file/previewtest'
}