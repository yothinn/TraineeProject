import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductDialogDetailsComponent } from './product-dialog-details/product-dialog-details.component';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';

const routes: Routes = [{
  path: '',
  component: ProductDialogDetailsComponent
}]

@NgModule({
  declarations: [ProductComponent, ProductDialogDetailsComponent, ProductDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductModule { }
