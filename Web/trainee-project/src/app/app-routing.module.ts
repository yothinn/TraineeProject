import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path:"attendance",
    loadChildren: () => import('./modules/attendance/attendance.module').then(m => m.AttendanceModule)
  },
  {
    path:"pettycash",
    loadChildren: () => import('./modules/pettycash/pettycash.module').then(m => m.PettycashModule)
  },
  {
    path:"product",
    loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule)
  },
  {
    path:"stock",
    loadChildren: () => import('./modules/stock/stock.module').then(m => m.StockModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
