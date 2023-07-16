export interface ProductsModel {
  name: string;
  hsnSacCode: string;
  rate: number;
  qty: number;
  gst: number;
}

export class Product implements ProductsModel {
  name: string = '';
  hsnSacCode: string = '';
  rate: number = 0;
  qty: number = 0;
  gst: number = 0;
}