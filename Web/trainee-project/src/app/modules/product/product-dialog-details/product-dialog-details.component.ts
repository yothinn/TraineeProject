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
  
  constructor(private dataService: ProductService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductDialogDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    // this.dataService.getProductCategories().subscribe((res: any) => {
    //   console.log(res.data)
    //   this.categories = res.data
    // })

    if (this.data._id) {
      this.productForm = this.createForm(this.data);
    } else {
      this.productForm = this.createForm(this.data);
    }
  }

  createForm(data) {
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
    console.log(this.productForm.value)
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


}