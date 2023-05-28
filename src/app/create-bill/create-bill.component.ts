import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppConstants } from 'src/constants/appConstants';
import { SelectComponent } from '../dialogs/select/select.component';
import { ProductsModel } from 'src/models/product.model';

@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.css'],
})
export class CreateBillComponent implements OnInit {
  name: string = '';
  hsnCode: string = '';
  selectType = this.appConstants.SEARCH_VENDOR_BY_NAME;
  products: ProductsModel[] = [
    { name: 'Product 1', hsnSacCode: '1234', rate: 1234, gst: 18, qty: 1 },
    { name: 'Product 1', hsnSacCode: '1234', rate: 1234, gst: 18, qty: 1 },
    { name: 'Product 1', hsnSacCode: '1234', rate: 1234, gst: 18, qty: 1 },
    { name: 'Product 1', hsnSacCode: '1234', rate: 1234, gst: 18, qty: 1 },
    { name: 'Product 1', hsnSacCode: '1234', rate: 1234, gst: 18, qty: 1 },
    { name: 'Product 1', hsnSacCode: '1234', rate: 1234, gst: 18, qty: 1 },
    { name: 'Product 1', hsnSacCode: '1234', rate: 1234, gst: 18, qty: 1 },
    { name: 'Product 1', hsnSacCode: '1234', rate: 1234, gst: 18, qty: 1 },
    { name: 'Product 1', hsnSacCode: '1234', rate: 1234, gst: 18, qty: 1 },
  ];

  constructor(
    public appConstants: AppConstants,
    private selectDialog: MatDialog
  ) {}

  ngOnInit(): void {}

  openSelectDialog(searchType: string) {
    let dailogData = {
      selectTopicType: searchType,
      selectModuleType:
        searchType == this.appConstants.SEARCH_VENDOR_BY_NAME
          ? this.appConstants.VENDOR
          : this.appConstants.PRODUCT,
      selectList: this.products,
    };

    this.selectDialog.open(SelectComponent, {
      data: dailogData,
      width: '400px',
      height: '400px',
      panelClass: 'custom-mat-dailog',
    });

    this.selectDialog.afterAllClosed.subscribe((data) => {});
  }
}
