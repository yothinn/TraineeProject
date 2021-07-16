import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PettychashComponent } from './pettychash.component';
import { RouterModule, Routes } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';

const routes: Routes = [
  {
    path:'',
    component:PettychashComponent
  }
]

@NgModule({
  declarations: [PettychashComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatSidenavModule
  ]
})
export class PettychashModule { }
