import { Component } from '@angular/core';
import { SearchMainService } from './search-main.service';
import { LoadingController,ModalController } from 'ionic-angular';
import { CheckAttrModal } from './modal/checkAttr/checkAttr.modal';
import { PreviewDocModal } from './modal/previewDoc/previewDoc.modal';
import { previewPDF } from './modal/previewPDF/previewPDF';

@Component({
    selector: 'search-main',
    templateUrl: 'search-main.html',
    providers: [SearchMainService]
})
export class searchMain {
    parameter = {
        docbase : 'wison_projects',
        object_name : '',
        currentPage : 1,
        parentId : 0,
        pageSize : 20,
        type: 2,
        totalCount : 0
    }
    searchResults: Array<any> = [];
    pageCount = 1;
    constructor(
        private _searchMainService: SearchMainService,
        private loadingCtrl: LoadingController,
        public modalCtrl: ModalController
    ) {
        this.getList()
    }

    async getList(event?){
        let loading = this.loadingCtrl.create({
            content: '请稍等...'
        });
        loading.present();
        try{
            let res = await this._searchMainService.getList(this.parameter);            
            loading.dismiss();
            this.parameter.totalCount = res.totalCount
            this.pageCount = res.totalCount/20
            this.pageCount =  Math.ceil(this.pageCount)
            if (event){
                this.searchResults = this.searchResults.concat(res.resultSet)
                event.complete();
            }else{
                this.searchResults = res.resultSet
            }
        } catch(err){
            loading.dismiss();
            if (event){
                event.complete();
            }
        }
        

    }

    checkAttr(searchResult){
        let checkAttrModal = this.modalCtrl.create(CheckAttrModal, { docbase : this.parameter.docbase,row: searchResult });
        checkAttrModal.present();
        checkAttrModal.onDidDismiss(data => {
            console.log(data);
        });
    }

    async changePage(event) {        
        if (this.parameter.currentPage >= this.pageCount) {
            event.complete()
            return
        }
        this.parameter.currentPage++;
        this.getList(event)                        
    }

    async itemSelected(row){
        if(row.r_object_type == 'wison_prj_document' || row.r_object_type == 'wison_document'){
            let preview = this.modalCtrl.create(previewPDF
                // PreviewDocModal
                , { docbase : this.parameter.docbase,row: row });
            preview.present();
            preview.onDidDismiss(data => {
                console.log(data);
            });
            return 
        }
        this.parameter.parentId = row.r_object_id;
        this.parameter.currentPage = 1;
        this.getList();
    }
}
