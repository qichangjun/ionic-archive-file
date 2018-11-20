import { Component } from '@angular/core';
import { NavParams, ViewController, LoadingController } from 'ionic-angular';
import { baseConfig } from '../../../../../core/service/baseConfig.service';
import Viewer from 'viewerjs';
@Component({
    selector: 'preview-doc',
    templateUrl: 'previewDoc.modal.html'    
})
export class PreviewDocModal {
    viewToken: any = ''
    attrLists: Array<any> = []
    constructor(
        public params: NavParams,
        public viewCtrl: ViewController,
        public _baseConfig: baseConfig
    ) {              
    }
    ngOnInit() {
        this.viewToken = this.params.get('viewToken')
        document.getElementById('iframePreview')['src'] = 'http://126.10.9.207:7080/osprey/#!/?viewToken=' + this.viewToken
    }

    dismiss() {
        this.viewCtrl.dismiss(true);
    }

}