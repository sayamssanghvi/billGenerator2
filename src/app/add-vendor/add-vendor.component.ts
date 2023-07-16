import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/models/vendor.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import _ from 'lodash';
import { MaterialConstants } from 'src/constants/materialConstants';
import { MessagesConstants } from 'src/constants/messages';
const electron = (<any>window).require('electron');

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.css'],
})
export class AddVendorComponent implements OnInit {
  vendor: Vendor;
  constructor(
    private snackBar: MatSnackBar,
    public matConstants: MaterialConstants,
    public msgConstants: MessagesConstants
  ) {
  }

  ngOnInit(): void {
    this.vendor = new Vendor();
  }

  async addVendor(): Promise<void> {
    let isValid = this.validations();
    if (isValid) {
      this.openSnackBar(this.msgConstants.VENDOR_ADDED, 5000, false);
      electron.ipcRenderer.send('createVendor', this.vendor);
      this.ngOnInit();
    }
  }

  private validations(): boolean {
    if (_.isEmpty(this.vendor.companyName)) {
      this.openSnackBar(this.msgConstants.NAME_REQUIRED, 2000, true);
      return false;
    } else if (_.isEmpty(this.vendor.gstin)) {
      this.openSnackBar(this.msgConstants.GSTIN_REQUIRED, 2000, true);
      return false;
    } else if (_.isEmpty(this.vendor.email)) {
      this.openSnackBar(this.msgConstants.EMAIL_REQUIRED, 2000, true);
      return false;
    } else if (_.isEmpty(this.vendor.shipToDoorNo)) {
      this.openSnackBar(this.msgConstants.SHIP_TO_DOOR_NO_REQUIRED, 2000, true);
      return false;
    } else if (_.isEmpty(this.vendor.shipToCityPincode)) {
      this.openSnackBar(
        this.msgConstants.SHIP_TO_CITY_PINCODE_REQUIRED,
        2000,
        true
      );
      return false;
    } else if (_.isEmpty(this.vendor.billToDoorNo)) {
      this.openSnackBar(this.msgConstants.BILL_TO_DOOR_NO_REQUIRED, 2000, true);
      return false;
    } else if (_.isEmpty(this.vendor.billToCityPincode)) {
      this.openSnackBar(
        this.msgConstants.BILL_TO_CITY_PINCODE_REQUIRED,
        2000,
        true
      );
      return false;
    } else if (this.vendor.gstin.length != 15) {
      this.openSnackBar(this.msgConstants.GSTIN_INVALID, 2000, true);
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
