import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'billGenerator2';
  formType: number;
  constructor() {
    this.formType = 2;
  }

}
