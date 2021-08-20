import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PettyCashComponent } from './pettyCash.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableComponent } from './table/table.component';
import { AddItemDialogComponent } from './add-item-dialog/add-item-dialog.component';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';





const routes: Routes = [
  {
    path:'',
    component:PettyCashComponent
  }
]

@NgModule({
  declarations: [PettyCashComponent, TableComponent, AddUserDialogComponent,AddItemDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule

  ]
})
export class PettyCashModule { }
