import { Component } from '@angular/core';
import { NavParams, ViewController, LoadingController } from 'ionic-angular';
import { storageInfoService } from '../../../../../core/service/storageInfo.service';
import { SearchMainService } from '../../search-main.service'
@Component({
    selector: 'advance-search',
    templateUrl: 'advanceSearch.modal.html',
    providers:[SearchMainService]
})
export class AdvanceSearchModal {
    filterParams={
        docbase : null
    }
    docBaseLists :Array<any> = []
    constructor(
        params: NavParams,
        public viewCtrl: ViewController,
        private _storageInfoService: storageInfoService,
        private _searchMainService : SearchMainService
        // private loadingCtrl: LoadingController
    ) {
        this.getDocBaseLists()
    }

    async getDocBaseLists(){
        let res = await this._searchMainService.getDocBaseLists()
        this.docBaseLists = res.libs
    }

    dismiss() {
        this.viewCtrl.dismiss(false);
    }

    confirm(){
        this.viewCtrl.dismiss(this.filterParams)
    }
}