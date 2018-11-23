import { Component,ViewChild } from '@angular/core';
import { MenuController, Nav } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { tabsMain } from './tabs-main/tabs-main';
import { searchMain } from './search-main/search-main';

@Component({
    selector: 'main-page',
    templateUrl: 'main-page.html'
})
export class mainPage {
    @ViewChild(Nav) nav: Nav;
    rootPage = searchMain;
    pages : Array<{title:string,component:any}>
    constructor(
        public menu: MenuController
    ) {
        this.pages = [            
            { title: '注销用户', component: LoginPage}
        ];
    }

    openPage(page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(page.component);
    }
}
