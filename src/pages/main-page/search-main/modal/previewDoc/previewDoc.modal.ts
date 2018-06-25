import { Component } from '@angular/core';
import { NavParams, ViewController, LoadingController } from 'ionic-angular';
import { baseConfig } from '../../../../../core/service/baseConfig.service';
import Viewer from 'viewerjs';
@Component({
    selector: 'preview-doc',
    templateUrl: 'previewDoc.modal.html'    
})
export class PreviewDocModal {
    row: any = {}
    docbase: string = ''
    attrLists: Array<any> = []
    constructor(
        params: NavParams,
        public viewCtrl: ViewController,
        public _baseConfig: baseConfig
        // private loadingCtrl: LoadingController
    ) {
        this.row = params.get('row')
        this.docbase = params.get('docbase')

    }
    ngOnInit() {
        var viewer = new Viewer(document.getElementById('images'), {
            inline: true
        });
        console.log(viewer)
    }



    dismiss() {
        this.viewCtrl.dismiss(true);
    }

}