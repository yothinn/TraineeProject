import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddUserDialogComponent } from './add-user-dialog.component';



@NgModule({
  declarations: [AddUserDialogComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AddUserDialogModule { }
