import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialConstants } from 'src/constants/materialConstants';
import { MessagesConstants } from 'src/constants/messages';
const electron = (<any>window).require('electron');
import numberConvertor from 'number-to-words';
import { ToWords } from 'to-words';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css'],
})
export class BillComponent implements OnInit {
  @ViewChild('billDiv') billDiv: ElementRef;

  bill: any;
  products: any;
  isIGST: boolean;
  totalAmount: number;
  totalGstAmount: number;
  grandTotal: number;
  vendor: any;
  basePath: string = 'D:\\personal\\Bill Generator\\SampleBillsByApp\\';
  version: number;
  rupeeWords: string;
  totalNoOfItems: number = 0;

  constructor(
    private router: Router,
    private data: ActivatedRoute,
    private snackBar: MatSnackBar,
    public matConstants: MaterialConstants,
    public msgConstants: MessagesConstants
  ) {
    this.bill = this.data.snapshot.params;
    this.products = JSON.parse(this.bill.products);
    this.isIGST = this.bill.isIGST === 'true';
    console.log(this.isIGST);
    this.totalAmount = this.bill.totalAmount;
    this.totalGstAmount = this.bill.totalGstAmount;
    this.grandTotal = this.bill.grandTotal;
    this.vendor = JSON.parse(this.bill.vendor);
    this.version = this.bill.version;
    this.vendor.billTo =
      this.vendor.billToDoorNo + ',\n' + this.vendor.billToCityPincode;
    this.vendor.shipTo =
      this.vendor.shipToDoorNo + ',\n' + this.vendor.shipToCityPincode;
    this.products.forEach((element: any) => {
      this.totalNoOfItems += parseInt(element.qty);
    });
    const toWords = new ToWords({
      localeCode: 'en-IN',
    });
    this.rupeeWords = toWords.convert(this.grandTotal, { currency: true });
  }

  ngOnInit(): void {}

  public async downloadAsPDF(type: string) {
    let billHTML = this.billDiv.nativeElement;

    html2canvas(billHTML).then(async (canvas) => {
      console.log('canvas');
      const contentDataURL = canvas.toDataURL('image/jpeg', 1.0);
      let pdf = new jsPDF('p', 'px', 'a4');
      pdf.addImage(contentDataURL, 'PNG', 12, -2, 440, 636);

      let pdfBuffer = pdf.output('arraybuffer');

      console.log('pdfBuffer');

      let result = electron.ipcRenderer.sendSync('savePDF', {
        pdfBuffer,
        vendor: this.vendor,
        billNo: this.bill.billNo,
        type,
        version: this.version,
      });

      console.log(result);

      if (result?.success && result.savePDF) {
        this.openSnackBar(this.msgConstants.BILL_CREATED_AND_SENT, 5000);
      } else if (result.savePDF) {
        this.openSnackBar(this.msgConstants.BILL_CREATED, 5000);
      }

      this.router.navigate(['home']);
    });
  }

  private openSnackBar(
    message: string,
    timeout: number,
    isError: boolean = false
  ): void {
    if (isError) {
      message = this.msgConstants.ERROR + message;
    }

    this.snackBar
      .open(message, '', {
        horizontalPosition: this.matConstants.CENTER,
        verticalPosition: this.matConstants.BOTTOM,
        panelClass: ['snackbar'],
      })
      ._dismissAfter(timeout);
  }
}
