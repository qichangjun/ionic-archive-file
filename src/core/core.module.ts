import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { baseConfig } from './service/baseConfig.service';
import { ApiUrlService } from './service/apiUrl.service';
import { httpHanldeService } from './service/httpHandle.service';
import { storageInfoService } from './service/storageInfo.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    baseConfig,
    ApiUrlService,
    httpHanldeService,
    storageInfoService
  ]
})
export class CoreModule {}
