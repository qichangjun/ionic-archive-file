import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { CoreModule } from '../core/core.module';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { mainPage } from '../pages/main-page/main-page';
import { searchMain } from '../pages/main-page/search-main/search-main';
import { HTTP, HTTPResponse } from '@ionic-native/http';
import { CheckAttrModal } from '../pages/main-page/search-main/modal/checkAttr/checkAttr.modal';
import { PreviewDocModal } from '../pages/main-page/search-main/modal/previewDoc/previewDoc.modal';
import { tabsMain } from '../pages/main-page/tabs-main/tabs-main';
import { previewPDF } from '../pages/main-page/search-main/modal/previewPDF/previewPDF';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    LoginPage,
    mainPage,
    searchMain,
    tabsMain,
    CheckAttrModal,
    PreviewDocModal,
    previewPDF
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule,ReactiveFormsModule,
    CoreModule,
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    LoginPage,
    mainPage,
    searchMain,
    tabsMain,
    previewPDF,
    CheckAttrModal,
    PreviewDocModal
  ],
  providers: [
    HTTP,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
