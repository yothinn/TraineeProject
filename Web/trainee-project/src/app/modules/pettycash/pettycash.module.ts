import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PettyCashComponent } from './pettyCash.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TableComponent } from './table/table.component';
import { AddItemDialogComponent } from './add-item-dialog/add-item-dialog.component';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';





const routes: Routes = [
  {
    path:'',
    component:PettyCashComponent
  }
]

@NgModule({
  declarations: [PettyCashComponent,ToolbarComponent, TableComponent, AddUserDialogComponent,AddItemDialogComponent, EditCustomerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class PettyCashModule { }
