import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditCutomerComponent } from './edit-cutomer.component';



@NgModule({
  declarations: [EditCutomerComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class EditCutomerModule { }
