import { ThisReceiver } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-categories-dialog',
  templateUrl: './categories-dialog.component.html',
  styleUrls: ['./categories-dialog.component.scss']
})
export class CategoriesDialogComponent implements OnInit {
  categoriesForm: FormGroup;
  input: any = "disabled";
  isDisabled: boolean = true;

  constructor(private dataService: ProductService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CategoriesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {

    if (this.data?._id) {
      this.categoriesForm = this.createForm(this.data);
    } else {
      this.data = [{ _id: "" }, { id: ""}, { name: ""}];    //เเก้ค่าว่าง     object                       //if (this.data == null) เช็ค null เเล้ว เซ้คให้เป็นค่าว่างก่อนส่งเข้า function
      this.categoriesForm = this.createForm(this.data); // this.productForm = this.createForm(this.data);
    }
  }

  createForm(data: any) {
    return this.fb.group({
      _id: [data?._id ], // ||""
      id: [ data?.id ],
      name: [data?.name]
    })
  }

  addCategories(): void {
    if (this.data._id) {
      this.dataService.editCategories(this.categoriesForm.value).subscribe(res => {
        if (res) {
          this.dialogRef.close(res);
        }
      })
    }
    else {
      this.dataService.createCategoriesData(this.categoriesForm.value).subscribe(res => {
        if (res) {
          this.dialogRef.close(res);
        }
      })

    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
