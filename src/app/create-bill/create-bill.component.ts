import _ from 'lodash';
import { Component, OnInit } from '@angular/core';
const electron = (<any>window).require('electron');
import { MatDialog } from '@angular/material/dialog';
import { Product, ProductsModel } from 'src/models/product.model';
import { AppConstants } from 'src/constants/appConstants';
import { Vendor, VendorModel } from 'src/models/vendor.model';
import { SelectComponent } from '../dialogs/select/select.component';
import { Router } from '@angular/router';
import moment from 'moment';
import { MessagesConstants } from 'src/constants/messages';
import { MaterialConstants } from 'src/constants/materialConstants';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.css'],
})
export class CreateBillComponent implements OnInit {
  name: string = '';
  vendor: Vendor;
  hsnCode: string = '';
  placeOfSupply: string = '';
  poNo: string = '';
  supplierCode: string = '';
  terms: string = '';
  dueDate: string = '';
  searchVendorText: string = '';
  searchProductHSN: string = '';
  searchProductText: string = '';
  vendorList: VendorModel[];
  products: ProductsModel[];
  productList: ProductsModel[];
  billProductList: any;
  selectType = this.appConstants.SEARCH_VENDOR_BY_NAME;
  totalAmount: number;
  totalGstAmount: number;
  grandTotal: number;
  bill: any;
  isIGST: boolean = false;
  invoiceDate: any = moment().format('DD-MM-YYYY');
  billNo: string = '';
  version: number = 1;
  createdAt: string;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private selectDialog: MatDialog,
    public appConstants: AppConstants,
    public msgConstants: MessagesConstants,
    public matConstants: MaterialConstants
  ) {
    this.vendor = new Vendor();
  }

  ngOnInit(): void {
    this.billProductList = [];
    this.vendor = new Vendor();
    this.totalAmount = 0;
    this.totalGstAmount = 0;
    this.grandTotal = 0;
  }

  openSelectDialog(searchType: string) {
    let selectList: any[];

    if (searchType == this.appConstants.SEARCH_PRODUCT_BY_HSN_CODE) {
      this.productList = electron.ipcRenderer.sendSync(
        'searchProductByHSN',
        this.searchProductHSN
      );
      selectList = this.productList;
    } else if (searchType == this.appConstants.SEARCH_PRODUCT_BY_NAME) {
      this.productList = electron.ipcRenderer.sendSync(
        'searchProductByName',
        this.searchProductText
      );
      selectList = this.productList;
    } else {
      this.vendorList = electron.ipcRenderer.sendSync(
        'searchVendor',
        this.searchVendorText
      );
      selectList = this.vendorList;
    }

    let dailogData = {
      selectTopicType: searchType,
      selectModuleType:
        searchType == this.appConstants.SEARCH_VENDOR_BY_NAME
          ? this.appConstants.VENDOR
          : this.appConstants.PRODUCT,
      selectList,
    };

    if (!_.isEmpty(selectList)) {
      const selectDialogRef = this.selectDialog.open(SelectComponent, {
        data: dailogData,
        width: '400px',
        height: '400px',
        panelClass: 'custom-mat-dailog',
      });

      selectDialogRef.afterClosed().subscribe((data) => {
        if (data.selectModuleType === this.appConstants.VENDOR) {
          this.allocateVendor(data);
        } else {
          this.allocateProducts(data);
        }
      });
    } else {
      this.openSnackBar(this.msgConstants.NO_PRODUCTS_FOUND, 5000);
    }
  }

  allocateVendor(data: any) {
    this.vendor = data.value;
    this.searchVendorText = this.vendor.companyName;
  }

  allocateProducts(data: any) {
    console.log(this.billProductList);
    this.billProductList.push({ ...data.value, qty: 1 });
    this.reCalculateAmount();
    this.searchProductHSN = '';
    this.searchProductText = '';
  }

  removeProductsFromBill(index: any) {
    this.billProductList.splice(index, 1);
    this.reCalculateAmount();
  }

  reCalculateAmount() {
    this.totalAmount = 0;
    this.totalGstAmount = 0;
    this.grandTotal = 0;
    console.log(this.billProductList);
    for (let [i, value] of this.billProductList.entries()) {
      let totalAmountOfSingleProduct = value.qty * value.rate;
      let totalGSTAmount = totalAmountOfSingleProduct * (value.gst / 100);

      //AllProducts
      this.totalAmount += parseFloat(totalAmountOfSingleProduct.toFixed(2));
      this.totalGstAmount += parseFloat(totalGSTAmount.toFixed(2));
      this.grandTotal = this.totalAmount + this.totalGstAmount;

      //Specific Product
      this.billProductList[i].totalAmount = parseFloat(
        totalAmountOfSingleProduct.toFixed(2)
      );
      this.billProductList[i].totalGSTAmount = parseFloat(
        totalGSTAmount.toFixed(2)
      );
      this.billProductList[i].grandTotal =
        totalGSTAmount + totalAmountOfSingleProduct;
    }
  }

  editBill() {
    let bill = electron.ipcRenderer.sendSync('searchBill', this.billNo);
    console.log(bill);
    if (_.isEmpty(bill)) {
      this.openSnackBar(this.msgConstants.BILL_DOES_NOT_EXIST, 5000);
      return;
    }
    this.billProductList = bill.products;
    this.searchVendorText = bill.meta.vendor.companyName;
    this.vendor = bill.meta.vendor;
    this.totalAmount = bill.totalAmount;
    this.totalGstAmount = bill.totalGstAmount;
    this.grandTotal = bill.grandTotal;
    this.dueDate = bill.dueDate;
    this.poNo = bill.poNo;
    this.placeOfSupply = bill.placeOfSupply;
    this.terms = bill.terms;
    this.isIGST = bill.isIGST === 0 ? false : true;
    this.supplierCode = bill.supplierCode;
    this.invoiceDate = moment(bill.createdAt).format('DD-MM-YYYY');
    this.version = bill.version + 1;
    this.createdAt = moment(bill.createdAt).format("DDMMYYYY");
    console.log(bill.version);
  }

  createBill(): void {
    if (!this.validations()) {
      return;
    }

    let isEdit = true;
    if (_.isEmpty(this.billNo)) {
      isEdit = false;
    }

    this.bill = {
      products: this.billProductList,
      grandTotal: this.grandTotal,
      totalAmount: this.totalAmount,
      totalGstAmount: this.totalGstAmount,
      vendor: this.vendor,
      placeOfSupply: this.placeOfSupply,
      poNo: _.isEmpty(this.poNo) ? '-' : this.poNo,
      supplierCode: _.isEmpty(this.supplierCode) ? '-' : this.supplierCode,
      terms: _.isEmpty(this.terms) ? '-' : this.terms,
      dueDate: _.isEmpty(this.dueDate) ? '-' : this.dueDate,
      billNo: this.billNo,
      isIGST: this.isIGST,
      invoiceDate: moment().format('DD-MM-YYYY'),
      version: this.version,
    };

    if (isEdit) {
      console.log(this.version);
      electron.ipcRenderer.sendSync('updateBill', this.bill);
      this.bill.billNo =
        'SI' + this.createdAt + this.billNo;
    } else {
      this.bill.billNo =
        'SI' +
        moment().utcOffset('+05:30').format('DDMMYYYY') +
        electron.ipcRenderer.sendSync('createBill', this.bill);
    }

    this.bill.products = JSON.stringify(this.bill.products);
    this.bill.vendor = JSON.stringify(this.bill.vendor);
    this.router.navigate(['/viewBill', JSON.parse(JSON.stringify(this.bill))]);
  }

  validations(): Boolean {
    if (_.isEmpty(this.placeOfSupply)) {
      this.openSnackBar(this.msgConstants.PLACE_OF_SUPPLY_REQUIRED, 3000);
      return false;
    } else if (_.isEmpty(this.vendor.companyName)) {
      this.openSnackBar(this.msgConstants.VENDOR_REQUIRED, 4000);
      return false;
    } else if (this.billProductList.length < 1) {
      this.openSnackBar(this.msgConstants.PRODUCT_REQUIRED, 4000);
      return false;
    }
    return true;
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
