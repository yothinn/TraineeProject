import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductDialogDetailsComponent } from './product-dialog-details/product-dialog-details.component';

const routes: Routes = [{
  path: '',
  component: ProductComponent
}]

@NgModule({
  declarations: [ProductComponent, ProductDialogDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductModule { }
