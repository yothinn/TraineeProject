import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-categories-dialog',
  templateUrl: './categories-dialog.component.html',
  styleUrls: ['./categories-dialog.component.scss']
})
export class CategoriesDialogComponent implements OnInit {
  productCategories: any;
  category = "";
  dataAddCategory: any;
  name: any;
  constructor(private dataService: ProductService,
    public dialogRef: MatDialogRef<CategoriesDialogComponent>) { }

  ngOnInit(): void {
    this.dataService.getProductCategories().subscribe((res: any) => {
      console.log(res.data);
      this.productCategories = res.data;
    })
  }

  ediCalories(dataCategory: any): void {
    this.dataService.getProductCategoriesById(dataCategory._id).subscribe((res: any) => {
      this.category = res.data.name;
      console.log(this.category);
    })
  }

  confirmEdit(body: any): void {
    console.log(body);
    // this.dataService.editCategories(this.category).subscribe(res => {
    // if (res) {
    //   this.dialogRef.close(res);
    // }
    // })
  }

  confirmAdd(): void {

  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
