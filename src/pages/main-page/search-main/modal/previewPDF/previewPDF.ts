import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import * as PDFJS from "pdfjs-dist/webpack.js";
import { SearchMainService } from "../../search-main.service";
@Component({
    selector: 'page-home',
    templateUrl: 'previewPDF.html',
    providers: [SearchMainService]
})
export class previewPDF {    
    pdfDocument: PDFJS.PDFDocumentProxy;
    PDFJSViewer = PDFJS;
    @ViewChild('canvas') canvasRef: ElementRef;   
    pageNum : number = 1;             //加载的pdf页数   
    totalPage : number = 1; 
    pdfDoc : any;
    pageRendering : boolean = false;
    row : any = {}
    constructor(
        params: NavParams,
        private _SearchMainService: SearchMainService,
        public navCtrl: NavController, public viewCtrl: ViewController) {
            this.row = params.get('row')
    }

    dismiss() {
        this.viewCtrl.dismiss(true);
    }

    ionViewDidLoad() {
        this.getFileBase64()
    }

    async getFileBase64() {
        let id = await this._SearchMainService.getEleId(this.row.id) 
        let data = await this._SearchMainService.getPdf(id)               
        this.PDFJSViewer.getDocument(data._body).then(pdf => {  
            this.pdfDoc = pdf  
            this.totalPage = pdf.numPages    
            this.renderPage()
        })
    }

    _arrayBufferToBase64( buffer ){
        var binary = '';
        var bytes = new Uint8Array( buffer );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
    }

    renderPage(){
        if (!this.pdfDoc){
            return 
        }
        this.pageRendering = true 
        this.pdfDoc.getPage(this.pageNum).then(((page) => {
            var canvas = this.canvasRef.nativeElement as HTMLCanvasElement            
            var context = canvas.getContext('2d');            
            canvas.width = 400;
            var viewport = page.getViewport(canvas.width / page.getViewport(1.0).width);
            canvas.height = viewport.height;
            // Render PDF page into canvas context
            var renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            var renderTask = page.render(renderContext);

            renderTask.promise.then(()=>{
                this.pageRendering = false;
            })
        }))
    }

    previous(){
        if (this.pageNum <= 1 || this.pageRendering) {
            return;
        }
        this.pageNum--;          
        this.renderPage()
    }

    next(){
        if (this.pageNum >= this.pdfDoc.numPages || this.pageRendering) {
            return;
        }
        this.pageNum++;
        this.renderPage()
    }
}