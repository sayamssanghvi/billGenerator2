export interface BillModel {
  placeOfSupply: string;
  vendor: any;
  billToAddress: string;
  shipToAddress: string;
  products: any;
  poNo: string;
  supplierCode: string;
  terms: string;
  dueDate: Date;
}
