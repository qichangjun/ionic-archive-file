import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { SearchMainService } from "../../search-main.service";
@Component({
    selector: 'page-home',
    templateUrl: 'previewPDF.html',
    providers: [SearchMainService]
})
export class previewPDF {    
    
}