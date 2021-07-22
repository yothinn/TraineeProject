import { Component, OnInit } from '@angular/core';
import { PettyCashService } from '../pettycash.service';

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.scss']
})
export class AddItemDialogComponent implements OnInit {
  date:any;
  documentNo: Number;
  list: String;
  admit: Number;
  pay: Number;
  placeOfUse: String;

  constructor(private pettyCashService: PettyCashService) { }

  ngOnInit(): void {
  }

  createList(){
    let customerList: any ={
      date:this.date,
      documentNo: this.documentNo ,
      list: this.list ,
      admit:this.admit ,
      pay: this.pay,
      placeOfUse: this.placeOfUse

    };
    this.pettyCashService.createCustomer(customerList).subscribe(
      success => alert("Done"),
      error => alert(error)
    )
  }
}
