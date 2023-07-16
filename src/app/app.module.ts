import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
import { AppConstants } from 'src/constants/appConstants';
import { CreateBillComponent } from './create-bill/create-bill.component';
import { SelectComponent } from './dialogs/select/select.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MaterialConstants } from 'src/constants/materialConstants';
import { MessagesConstants } from 'src/constants/messages';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/directives/directives.module';
import { BillComponent } from './bill/bill.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    AddVendorComponent,
    CreateBillComponent,
    SelectComponent,
    BillComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSnackBarModule,
    MatDialogModule,
    FormsModule,
    DirectivesModule
  ],
  providers: [AppConstants, MaterialConstants, MessagesConstants],
  bootstrap: [AppComponent],
})
export class AppModule {}
