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
        // let pdfData = await this._SearchMainService.getPdf()
        let pdfData = atob('JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwog' +
            'IC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAv' +
            'TWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0K' +
            'Pj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAg' +
            'L1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+' +
            'PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9u' +
            'dAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2Jq' +
            'Cgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJU' +
            'CjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVu' +
            'ZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4g' +
            'CjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAw' +
            'MDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9v' +
            'dCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G')        
        this.PDFJSViewer.getDocument({ data: pdfData }).then(pdf => {  
            this.pdfDoc = pdf  
            this.totalPage = pdf.numPages    
            this.renderPage()
        })
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