import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'billGenerator2';
  formType: number;

  constructor() {
    this.formType = 2;
  }

  ngOnInit(): void {}
}
