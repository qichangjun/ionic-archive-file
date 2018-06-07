import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
@Injectable()

export class storageInfoService{
    constructor(private storage: Storage,){}
    getAuthInfo(){
        return this.storage.get('AuthInfo').then(val => val);
    }
}