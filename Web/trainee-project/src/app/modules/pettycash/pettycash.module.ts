import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PettycashComponent } from './pettycash.component';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { TableComponent } from './table/table.component';
import { AddItemDialogComponent } from './add-item-dialog/add-item-dialog.component';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { EditCutomerComponent } from './edit-cutomer/edit-cutomer.component';





const routes: Routes = [
  {
    path:'',
    component:PettycashComponent
  }
]

@NgModule({
  declarations: [PettycashComponent,ToolbarComponent, TableComponent, AddUserDialogComponent,AddItemDialogComponent, EditCutomerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class PettycashModule { }
