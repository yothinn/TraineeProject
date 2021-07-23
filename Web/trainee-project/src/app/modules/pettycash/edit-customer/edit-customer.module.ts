import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditCustomerComponent } from './edit-customer.component';



@NgModule({
  declarations: [EditCustomerComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class EditCustomerModule { }
