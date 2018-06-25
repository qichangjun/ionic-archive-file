import { Component } from '@angular/core';
import { NavParams, ViewController, LoadingController } from 'ionic-angular';
@Component({
    selector: 'advance-search',
    templateUrl: 'advanceSearch.modal.html'    
})
export class AdvanceSearchModal {
    filterParams={
        docbase : null,
        year : null,
        keepDate : null
    }
    constructor(
        params: NavParams,
        public viewCtrl: ViewController
        // private loadingCtrl: LoadingController
    ) {
       
    }
    ngOnInit() {
       
    }

    dismiss() {
        this.viewCtrl.dismiss(false);
    }

    confirm(){
        this.viewCtrl.dismiss(this.filterParams)
    }
}