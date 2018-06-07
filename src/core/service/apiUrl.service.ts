import { Injectable } from '@angular/core';
@Injectable()

export class ApiUrlService {
    login = '/user/login';
    search = '/search/full_text';
    getFileList = '/navigation/list';
    getFileInfo = '/attribute/get_attributes';
}