import { Component,ViewChild } from '@angular/core';
import { ListPage } from '../../list/list';
import { LoginPage } from '../../login/login';
import { searchMain } from '../search-main/search-main';


@Component({
    selector: 'tabs-main',
    templateUrl: 'tabs-main.html'
})
export class tabsMain {
    searchPage = searchMain;
    listPage = ListPage;
    keywords : string = ''
    constructor() {}
    setKeywords (){
        
    }

}
