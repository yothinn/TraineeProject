import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockComponent } from './stock.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [

  {
    path: '',
    component: StockComponent
  }

]

@NgModule({
  declarations: [StockComponent],
  imports: [
    CommonModule,
    SharedModule,

    
    RouterModule.forChild(routes)
  ]
})
export class StockModule { }
