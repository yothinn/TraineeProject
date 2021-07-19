import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PettycashComponent } from './pettycash.component';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarDisplayComponent } from './toolbar-display/toolbar-display.component';
import { TableComponent } from './table/table.component';



const routes: Routes = [
  {
    path:'',
    component:PettycashComponent
  }
]

@NgModule({
  declarations: [PettycashComponent,ToolbarComponent, ToolbarDisplayComponent, TableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class PettycashModule { }
