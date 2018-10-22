import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Storage } from '@ionic/storage';
import { LoadingController,NavController } from 'ionic-angular';
import { mainPage } from '../main-page/main-page';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html',
  providers:[LoginService]
})
export class LoginPage {
  model : {
    username : String,
    password : String 
  }
  constructor(
    private iab: InAppBrowser,
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private storage: Storage,
    private _LoginService : LoginService
  ) {
    this.model = {
      username : '',
      password : ''
    }
    this.storage.remove('AuthInfo');
  }

  createWeb(){
    const browser = this.iab.create('https://baidu.com');
  }
  
  async login(){
    let loading = this.loadingCtrl.create({
      content: '请稍等...'
    });
    loading.present();
    try{            
      let res = await this._LoginService.login(this.model)
      loading.dismiss();
      this.storage.set('AuthInfo', {accessToken:res});
      this.navCtrl.push(mainPage);
    }catch(err){
      loading.dismiss();
    }    
  }
}
