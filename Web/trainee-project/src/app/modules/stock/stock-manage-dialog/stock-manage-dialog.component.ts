import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  // status = new FormControl('auto');

  constructor(private fb: FormBuilder,
    private stockService: StockService,
    public dialogRef: MatDialogRef<StockManageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.stockService.getProduct()
      .subscribe((res) => {
        this.productList = res.data;
        console.log(this.productList);
      })
    this.stockForm = this.createForm(this.data);

    if (this.data?._id) {
      this.data._id = "";
      console.log(this.data._id);
      this.stockForm = this.createForm(this.data);
    } else {
      console.log(this.data);
      this.data = [];
      this.stockForm = this.createForm(this.data);
    }
  }

  getByProductId(item) {
    let data = item.viewValue.split("|");
   let name = data[1].trim();
   this.stockForm.patchValue({
    productName: name
  });
  }

  createForm(data) {
    return this.fb.group({
      productId: [data?.productId],
      productName: [data?.productName],
      date: [data?.date],
      total: [data?.total],
      status: [data?.status]
    })
  }

  onSubmit() {
    console.log(this.stockForm.value)
    console.log("create");
    this.stockService.createStock(this.stockForm.value)
      .subscribe(res => {
        if (res) {
          this.dialogRef.close(res);
        }
      })
  }

  onCloe() {
    this.dialogRef.close();
  }
}
