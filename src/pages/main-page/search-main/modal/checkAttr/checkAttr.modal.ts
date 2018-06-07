import { Component } from '@angular/core';
import { NavParams,ViewController,LoadingController } from 'ionic-angular';
import { SearchMainService } from '../../search-main.service';

@Component({
    selector: 'check-attr',
    templateUrl: 'checkAttr.modal.html',
    providers:[SearchMainService]
})
export class CheckAttrModal {
    row : any = {}
    docbase : string = ''
    attrLists : Array<any> = []
    constructor(
        params: NavParams,
        public viewCtrl: ViewController,
        private _searchMainService : SearchMainService,
        private loadingCtrl: LoadingController
    ) {        
        this.row = params.get('row')
        this.docbase = params.get('docbase')
        this.getFileInfo()
    }

    dismiss() {
        let data = { 'foo': 'bar' };
        this.viewCtrl.dismiss(data);
    }

    async getFileInfo(){
        let loading = this.loadingCtrl.create({
            content: '请稍等...'
        });
        loading.present();
        try{
            let res = await this._searchMainService.getFileInfo(this.docbase,this.row.r_object_id)
            this.attrLists = res 
            loading.dismiss()
        } catch(err){
            loading.dismiss()
        }                
    }
}