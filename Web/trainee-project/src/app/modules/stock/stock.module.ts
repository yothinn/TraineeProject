import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockComponent } from './stock.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockTableComponent } from './stock-table/stock-table.component';
import { StockReportDialogComponent } from './stock-report-dialog/stock-report-dialog.component';

const routes: Routes = [

  {
    path: '',
    component: StockComponent
  }

]

@NgModule({
  declarations: [StockComponent, StockListComponent, StockTableComponent, StockReportDialogComponent],
  imports: [
    CommonModule,
    SharedModule,

    
    RouterModule.forChild(routes)
  ]
})
export class StockModule { }
