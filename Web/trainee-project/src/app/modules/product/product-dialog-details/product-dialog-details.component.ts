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

  constructor(private dataService: ProductService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductDialogDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.dataService.getProductCategories().subscribe((res: any) => {
      this.categories = res.data;
    })

    if (this.data?._id) {
      this.productForm = this.createForm(this.data);
    } else {
      console.log(this.data)
      this.data = {};   
      this.data.image = "https://cdn2.iconfinder.com/data/icons/shopping-delivery/25/Product_Package_Add-512.png"                         //if (this.data == null) เช็ค null เเล้ว เซ้คให้เป็นค่าว่างก่อนส่งเข้า function
      console.log(this.data)
      this.productForm = this.createForm(this.data); 
    }
  }

  createForm(data: any) {
    return this.fb.group({
      _id: [data._id],
      productId: [data.productId],
      productName: [data.productName],
      type: [data.type],
      description: [data.description],
      count: [data.count],
      price: [data.price],
      image: [data.image]
    })
  }

  addProduct(): void {
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
  closeDialog(): void {
    this.dialogRef.close();
  }

  uploadImage(event) {
    console.log(event);
    const file = event.target.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append('files', file);
    console.log(formData);
    this.dataService.uploadImageProduct(formData)
      .subscribe((res) => {
        this.productForm.patchValue({
          image: res.data.url
        })
        console.log(res.data.url)
        this.data.image =  res.data.url
      })
  }


}