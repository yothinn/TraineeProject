import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddItemDialogComponent } from './add-item-dialog.component';



@NgModule({
  declarations: [AddItemDialogComponent],
  imports: [
    CommonModule,
    SharedModule

  ]
})
export class AddItemDialogModule { }
