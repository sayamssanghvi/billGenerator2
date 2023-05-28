import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent implements OnInit {
  productList: any = [
    { name: 'Glasses' },
    { name: 'Gloves' },
    { name: 'Helmets' },
    { name: 'Safety Vest' },
    { name: 'Protective Boots' },
    { name: 'Respiratory Masks' },
  ];

  selectTopicType:string;
  selectModuleType: string;
  selectList: any;

  constructor(
    public dialogRef: MatDialogRef<SelectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectTopicType = data.selectTopicType;
    this.selectModuleType = data.selectModuleType;
    console.log(data.selectList)
    this.selectList = data.selectList;
  }

  ngOnInit(): void { }
  
  onSelection(selectedRow:any) {
    console.log(selectedRow);
  }
}
