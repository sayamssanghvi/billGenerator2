export interface VendorModel {
  companyName: string;
  billToDoorNo: string;
  billToCityPincode: string;
  shipToDoorNo: string;
  shipToCityPincode: string;
  gstin: string;
  email: string;
}

export class Vendor implements VendorModel {
  companyName = '';
  billToDoorNo = '';
  billToCityPincode = '';
  shipToDoorNo = '';
  shipToCityPincode = '';
  gstin = '';
  email = '';
}
