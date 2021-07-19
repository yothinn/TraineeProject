import { Component, OnInit } from '@angular/core';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
    ,
    {value: 'tacos-2', viewValue: 'Tacos'}
    ,
    {value: 'tacos-2', viewValue: 'Tacos'}
    ,
    {value: 'tacos-2', viewValue: 'Tacos'}
    ,
    {value: 'tacos-2', viewValue: 'Tacos'}
    ,
    {value: 'tacos-2', viewValue: 'Tacos'}
    ,
    {value: 'tacos-2', viewValue: 'Tacos'}
  ]; 
  constructor() { }

  ngOnInit(): void {
  }

}
