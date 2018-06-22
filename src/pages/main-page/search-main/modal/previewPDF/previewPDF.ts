import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import * as PDFJS from "pdfjs-dist/webpack.js";
import { PDFPageProxy, PDFPageViewport, PDFRenderTask } from 'pdfjs-dist';
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
    constructor(
        private _SearchMainService: SearchMainService,
        public navCtrl: NavController, public viewCtrl: ViewController) {
    }

    dismiss() {
        this.viewCtrl.dismiss(true);
    }

    ionViewDidLoad() {
        this.getFileBase64()
    }

    async getFileBase64() {
        let data = await this._SearchMainService.getPdf()        
        data = this._arrayBufferToBase64(data._body)  
        console.log(data)              
        let pdfData = atob(data)  
        console.log(pdfData)              
        this.PDFJSViewer.getDocument({ data: pdfData }).then(pdf => {  
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
        this.pdfDoc.getPage(this.pageNum).then(((page) => {
            var scale = 1.5;
            var viewport = page.getViewport(scale);
            var canvas = this.canvasRef.nativeElement as HTMLCanvasElement            
            var context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            // Render PDF page into canvas context
            var renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            var renderTask = page.render(renderContext);
        }))
    }

    previous(){
        if (this.pageNum <= 1) {
            return;
        }
        this.pageNum--;          
        this.renderPage()
    }

    next(){
        if (this.pageNum >= this.pdfDoc.numPages) {
            return;
        }
        this.pageNum++;
        this.renderPage()
    }
}