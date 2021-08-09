import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock-manage-dialog',
  templateUrl: './stock-manage-dialog.component.html',
  styleUrls: ['./stock-manage-dialog.component.scss']
})
export class StockManageDialogComponent implements OnInit {
  productList: any;
  stockForm: FormGroup;
  status: Array<any> = [{ name: "นำเข้า" }, { name: "นำออก" }];

  constructor(private fb: FormBuilder,
    private stockService: StockService,
    public dialogRef: MatDialogRef<StockManageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.stockForm = this.createForm();
    // console.log(this.data);
    this.productList = this.data;
    console.log(this.productList);
  }

  createForm() {
    return this.fb.group({
      productId: [''],
      productName: [''],
      productType: [''],
      date: [''],
      count: [''],
      status: ['']
    })
  }

  onSubmit() {
    console.log(this.stockForm.value)
    if (this.data._id) {
      this.stockService.updateStock(this.stockForm.value)
        .subscribe((res) => {
          console.log(res)
          if (res) {
            this.dialogRef.close(res);
          }
        })
    } else {
      this.stockService.createStock(this.stockForm.value)
        .subscribe(res => {
          if (res) {
            this.dialogRef.close(res);
          }
        })
    }
  }
}
