import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockComponent } from './stock.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockTableComponent } from './stock-table/stock-table.component';
import { StockReportDialogComponent } from './stock-report-dialog/stock-report-dialog.component';
import { StockManageDialogComponent } from './stock-manage-dialog/stock-manage-dialog.component';
// import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
// import { MomentDateModule } from '@angular/material-moment-adapter';

const routes: Routes = [

  {
    path: '',
    component: StockComponent
  }

]

@NgModule({
  declarations: [StockComponent, StockListComponent, StockTableComponent, StockReportDialogComponent, StockManageDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    // MomentDateModule,
    // MatDatepickerModule,
    // MatNativeDateModule,

    RouterModule.forChild(routes)
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class StockModule { }
