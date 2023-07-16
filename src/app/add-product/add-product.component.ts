import { Component, OnInit } from '@angular/core';
import { Product } from 'src/models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import _ from 'lodash';
import { MaterialConstants } from 'src/constants/materialConstants';
import { MessagesConstants } from 'src/constants/messages';
const electron = (<any>window).require('electron');

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  product: Product;
  constructor(
    private snackBar: MatSnackBar,
    public matConstants: MaterialConstants,
    public msgConstants: MessagesConstants
  ) {}

  ngOnInit(): void {
    this.product = new Product();
  }

  addProduct(): void {
    let isValid = this.validations();
    if (isValid) {
      this.openSnackBar(this.msgConstants.PRODUCT_ADDED, 5000, false);
      electron.ipcRenderer.send('createProduct', this.product);
      this.ngOnInit();
    }
  }

  private validations(): boolean {
    if (_.isEmpty(this.product.name)) {
      this.openSnackBar(this.msgConstants.NAME_REQUIRED, 2000, true);
      return false;
    } else if (_.isEmpty(this.product.hsnSacCode)) {
      this.openSnackBar(this.msgConstants.HSN_SAC_REQUIRED, 2000, true);
      return false;
    } else if (this.product.rate == 0) {
      this.openSnackBar(this.msgConstants.RATE_REQUIRED, 2000, true);
      return false;
    } else if (this.product.gst == 0) {
      this.openSnackBar(this.msgConstants.GST_NO_REQUIRED, 2000, true);
      return false;
    } else if (this.product.hsnSacCode.length != 6) {
      this.openSnackBar(
        this.msgConstants.ENTER_A_VALID_HSN_SAC_CODE,
        2000,
        true
      );
      return false;
    } else {
      return true;
    }
  }

  //Opens SnackBar
  private openSnackBar(
    message: string,
    timeout: number,
    isError: boolean
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
