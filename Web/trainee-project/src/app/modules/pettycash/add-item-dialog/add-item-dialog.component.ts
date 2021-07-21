import { Component, OnInit } from '@angular/core';
import { PettycashService } from '../pettycash.service';

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.scss']
})
export class AddItemDialogComponent implements OnInit {
  documentNo: Number;
  list: String;
  admit: Number;
  pay: Number;
  placeOfUse: String;

  constructor(private pettycashService: PettycashService) { }

  ngOnInit(): void {
  }

  createList(){
    let customerList: any ={
      documentNo: this.documentNo ,
      list: this.list ,
      admit:this.admit ,
      pay: this.pay,
      placeOfUse: this.placeOfUse

    };
    this.pettycashService.createCustomer(customerList).subscribe(
      success => alert("Done"),
      error => alert(error)
    )
  }
}
