import { Component } from '@angular/core';
import { SearchMainService } from './search-main.service';
import { LoadingController,ModalController } from 'ionic-angular';
import { PreviewDocModal } from './modal/previewDoc/previewDoc.modal';
import { previewPDF } from './modal/previewPDF/previewPDF';
import { AdvanceSearchModal } from './modal/advanceSearch/advanceSearch.modal'
import { InAppBrowser } from '@ionic-native/in-app-browser';
@Component({
    selector: 'search-main',
    templateUrl: 'search-main.html',
    providers: [SearchMainService]
})
export class searchMain {
    parameter = {
        docbaseName : undefined,
        libId : undefined,
        keywords : '',
        currentPage : 1,
        parentId : null,
        pageSize : 20,
        type: null,
        totalCount : 0,
        ids : [null],
        isFile : false
    }
    columns = [];
    docBaseLists = [];
    searchResults: Array<any> = [];
    pageCount = 1;
    constructor(
        private iab: InAppBrowser,
        private _searchMainService: SearchMainService,
        private loadingCtrl: LoadingController,
        public modalCtrl: ModalController
    ) {      
        this.getDocBaseLists()
        // this.getList()
    }

    /**
     * 获取档案列表
     * @param event : 下拉分页对象，complete方法用来停止动画
     */
    async getList(event?){
        if(!this.parameter.libId){
            return 
        }
        let loading = this.loadingCtrl.create({
            content: '请稍等...'
        });
        loading.present();
        try{
            //没有parentId时，获取档案列表
            //否则获取文件列表，接口不同
            var res;
            if (!this.parameter.parentId){
                res = await this._searchMainService.getArchivesList(this.parameter);  
                this.parameter.totalCount = res.pages.totalCount                        
                this.pageCount = res.pages.totalCount/20            
                this.pageCount =  Math.ceil(this.pageCount)          
            } else {
                res = await this._searchMainService.getFileList(this.parameter);
            }            
            //确认分页数量,总数除以20，向上取整
            //用于下拉分页确认下一页有无数据            
            if (event && !this.parameter.parentId){
                //是下拉分页，合并数据，关闭下啦动画
                this.columns = res.columns
                let data = res.datas 
                let rows = []
                data.forEach(c => {
                    rows.push(JSON.parse(c) )                    
                });                  
                this.searchResults = this.searchResults.concat(rows)                
                event.complete();
            }else{
                this.columns = res.columns
                let data = res.datas 
                let rows = []
                data.forEach(c => {
                    rows.push(JSON.parse(c) )                    
                });  
                console.log(rows)
                this.searchResults = rows 
            }
            loading.dismiss();
        } catch(err){
            console.log(err)
            loading.dismiss();
            if (event){
                event.complete();
            }
        }
        

    }

    changeDocbase(){
        this.parameter.type = null
        this.parameter.ids = [null]
        this.parameter.parentId = null
        this.getList()        
    }

    /**
     * 分页方法
     * @param event 用于关闭分页下啦动画
     */
    async changePage(event) {        
        if (this.parameter.currentPage >= this.pageCount) {
            event.complete()
            return
        }
        this.parameter.currentPage++;
        this.getList(event)                        
    }

    /**
     * 点击档案或文件
     * @param row 档案对象或者文件对象
     * 跳转往预览页面，或进入下一级
     */
    async itemSelected(row){
        if(row.type == '3' ){
            let loading = this.loadingCtrl.create({
                content: '请稍等...'
            });
            loading.present();
            try{
                let info = await this._searchMainService.getElectronicRecord(row.id,this.parameter.libId)
                if (info.type == 'pdf' || info.type == 'PDF'){
                    let path = await this._searchMainService.getPdfPreviewPath(info)
                    const browser = this.iab.create(path);                
                }else{
                    let viewToken = await this._searchMainService.getPreviewToken(info)
                    const browser = this.iab.create('http://10.154.97.4:7080/osprey/#!/?viewToken=' + viewToken);
                }        
                loading.dismiss();            
                return   
            }catch(err){
                loading.dismiss();
            }
            
        }
        //点击的是档案时，进入下一层，向ids数组中添加该档案的id
        //副职parentId,并且跳转到第一页
        this.parameter.type = row.type
        this.parameter.keywords = '';
        this.parameter.ids.push(row.id);
        this.parameter.parentId = row.id;
        this.parameter.currentPage = 1;
        this.getList();
    }

    async getDocBaseLists(){
        let res = await this._searchMainService.getDocBaseLists()
        this.docBaseLists = res.libs
    }

    /**
     * 打开高级检索框
     */
    async openSearchAdvance(){
        let res = await this._searchMainService.getDocBaseLists()
        let docBaseLists = res.libs
        let advanceSearch = this.modalCtrl.create(
            AdvanceSearchModal,{docBaseLists : docBaseLists}
        );        
        advanceSearch.onDidDismiss(data => {            
            if(!data.docbase){
                return 
            }
            this.parameter.libId = data.docbase.objectId
            this.parameter.docbaseName = data.docbase.name
        });
        advanceSearch.present();
        return 
    }

    /**
     * 下啦刷新
     * @param refresh 用于结束下啦动画
     */
    async doRefresh(refresh){
        try{            
            //刷新总是跳转回第一页
            this.parameter.currentPage = 1
            var res;
            if (!this.parameter.parentId){
                res = await this._searchMainService.getArchivesList(this.parameter);            
            }else{
                res = await this._searchMainService.getFileList(this.parameter);
            }            
            this.parameter.totalCount = res.page.totalCount
            this.pageCount = res.page.totalCount/20
            this.pageCount =  Math.ceil(this.pageCount)
            this.searchResults = res.dataList
            refresh.complete();
        } catch(err){
            refresh.complete();
        }
    }

    /**
     * 返回上一级
     */
    gotoPrevious(){
        if (this.parameter.ids.length == 1){
            return 
        }
        this.parameter.ids.pop()
        this.parameter.parentId = this.parameter.ids[this.parameter.ids.length - 1]      
        if(!this.parameter.parentId){
            this.parameter.type = null
        }else{
            this.parameter.type = Number(this.parameter.type) - 1
        }
        this.getList()
    }
}
