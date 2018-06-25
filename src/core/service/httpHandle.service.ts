import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { ToastController } from 'ionic-angular';
import { HTTPResponse } from '@ionic-native/http';
@Injectable()

export class httpHanldeService {
    constructor(public toastCtrl: ToastController){}

    public extractDataSuccess(res: Response) {
        let body = res.json();
        let toast = this.toastCtrl.create({
            message: body.message,
            duration: 3000
        });        
        if (body.code == 1) {
            toast.present()         
            return body.data || {};
        } else {
            toast.present()
            return Promise.reject(body.message);
        }
    }

    public extractData(res: Response) {
        let body = res.json();
        let toast = this.toastCtrl.create({
            message: body.message,
            duration: 3000
        });        
        if (body.code == 1) {         
            return body.data || {};
        } else {
            toast.present()
            return Promise.reject(body.message);
        }
    }

    public extractDataNativeHttp(res: HTTPResponse){
        
    }

    public handleError(error: any): Promise<any> {  
        console.error(error)      
        return Promise.reject(error.message || error);
    }
}