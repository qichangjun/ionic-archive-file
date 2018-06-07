import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { storageInfoService } from '../core/service/storageInfo.service';
import { mainPage } from '../pages/main-page/main-page';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage = null;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public _storageInfoService : storageInfoService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      (async ()=>{
        let res = await this._storageInfoService.getAuthInfo()
        if (res) {
          this.nav.setRoot(mainPage)
          return 
        }
          this.nav.setRoot(LoginPage)
      })() 
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}
