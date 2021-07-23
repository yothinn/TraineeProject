import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductDialogDetailsComponent } from './product-dialog-details/product-dialog-details.component';
import { CategoriesDialogComponent } from './categories-dialog/categories-dialog.component';


const routes: Routes = [{
  path: '',
  component: ProductComponent
}]

@NgModule({
  declarations: [ProductComponent, ProductDialogDetailsComponent, CategoriesDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductModule { }
