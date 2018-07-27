import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Storage } from '@ionic/storage';
import { LoadingController,NavController } from 'ionic-angular';
import { mainPage } from '../main-page/main-page';

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
  async login(){
    let loading = this.loadingCtrl.create({
      content: '请稍等...'
    });
    loading.present();
    try{            
      // let res = await this._LoginService.login(this.model)
      loading.dismiss();
      this.storage.set('AuthInfo', {accessToken:'res'});
      this.navCtrl.push(mainPage);
    }catch(err){
      loading.dismiss();
    }    
  }
}
