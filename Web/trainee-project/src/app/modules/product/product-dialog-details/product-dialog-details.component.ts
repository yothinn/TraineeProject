import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-dialog-details',
  templateUrl: './product-dialog-details.component.html',
  styleUrls: ['./product-dialog-details.component.scss']
})
export class ProductDialogDetailsComponent implements OnInit {
  productForm: FormGroup;
  categories: any;
  selected = 'option2';
  
  constructor(private dataService: ProductService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductDialogDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.dataService.getProductCategories().subscribe((res: any) => {
      // console.log(res.data)
      this.categories = res.data
    })

    if (this.data?._id) {
      this.productForm = this.createForm(this.data);
    } else  { //if (this.data == null) เช็ค null เเล้ว เซ้คให้เป็นค่าว่างก่อนส่งเข้า function
      // this.productForm = this.createForm(this.data);
    }
  }

  createForm(data:any) {
    // console.log(data)
    return this.fb.group({
      _id: [data._id],
      productId: [data.productId],
      productName: [data.productName],
      category: [data.category],
      description: [data.description],
      count: [data.count],
      price: [data.price]
    })
  }

  addProduct() {
    if (this.data._id) {
      this.dataService.editProductData(this.productForm.value).subscribe(res => {
        if (res) {
          this.dialogRef.close(res);
        }
      })
    }
    else {
      this.dataService.createProductData(this.productForm.value).subscribe(res => {
        if (res) {
          this.dialogRef.close(res);
        }
      })

    }
  }
  closeDialog(){
    this.dialogRef.close();
  }


}