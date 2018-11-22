import { Component } from '@angular/core';
import { SearchMainService } from './search-main.service';
import { LoadingController, ModalController, NavParams,NavController } from 'ionic-angular';
import { PreviewDocModal } from './modal/previewDoc/previewDoc.modal';
import { previewPDF } from './modal/previewPDF/previewPDF';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
    selector: 'search-main',
    templateUrl: 'search-main.html',
    providers: [SearchMainService]
})
export class searchMain {
    parameter = {
        docbase : 'wison_projects',
        keywords : '',
        currentPage : 1,
        parentId : null,
        pageSize : 20,
        type: 2,
        totalCount : 0
    }
    searchResults: Array<any> = [];
    pageCount = 1;
    constructor(
        public navParams: NavParams,
        private iab: InAppBrowser,
        private _searchMainService: SearchMainService,
        private loadingCtrl: LoadingController,
        public modalCtrl: ModalController,
        public navCtrl: NavController
    ) {      
        this.parameter.parentId = this.navParams.get('parentId');        
        if (this.parameter.parentId){
            this.getList()
        }
    }

    /**
     * 获取档案列表
     * @param event : 下拉分页对象，complete方法用来停止动画
     */
    async getList(event?){
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
            } else {
                res = await this._searchMainService.getFileList(this.parameter);
            }               
            loading.dismiss();
            //确认分页数量,总数除以20，向上取整
            //用于下拉分页确认下一页有无数据
            this.parameter.totalCount = res.page.totalCount            
            this.pageCount = res.page.totalCount/20
            this.pageCount =  Math.ceil(this.pageCount)
            if (event){
                //是下拉分页，合并数据，关闭下啦动画
                this.searchResults = this.searchResults.concat(res.dataList)                
                event.complete();
            }else{
                this.searchResults = res.dataList
            }
        } catch(err){
            loading.dismiss();
            if (event){
                event.complete();
            }
        }
        

    }

    /**
     * 分页方法
     * @param event 用于关闭分页下啦动画
     */
    async changePage(event) {  
        if (this.parameter.parentId){ 
            event.complete()
            return 
        }     
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
        if(row.objectType == 'file' ){
            let loading = this.loadingCtrl.create({
                content: '请稍等...'
            });                         
            loading.present();
            try{
                let info = await this._searchMainService.getElectronicRecord(row.id)
                let viewToken = await this._searchMainService.getPreviewToken(info)
                loading.dismiss();
                this.navCtrl.push(PreviewDocModal,{
                    viewToken : viewToken
                })   
                return 
            }catch(err){
                loading.dismiss();
                return 
                //const browser = this.iab.create('http://126.10.9.207:7080/osprey/#!/?viewToken=' + viewToken);                                      
            }
        }else{
            //副职parentId,并且跳转到第一页        
            this.parameter.parentId = row.id;
            this.parameter.currentPage = 1;
            this.getList();  
        }                      
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
        if (!this.parameter.parentId){
            return 
        }        
        this.parameter.parentId = null
        this.getList()
    }

    search(){        
        this.parameter.parentId = null     
        this.getList()
    }
}
