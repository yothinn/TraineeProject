import { Component, OnInit } from '@angular/core';
import { PettyCashService } from '../pettycash.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {
  name: String;
  lastName: String;
  amount: Number;
  limit: Number;


  constructor(private pettyCashService: PettyCashService) { }

  ngOnInit(): void {
  }

  createList(){
    let customerList: any ={
      
      name: this.name ,
      lastName: this.lastName ,
      amount:this.amount ,
      limit: this.limit


    };
    this.pettyCashService.createCustomer(customerList).subscribe(
      success => alert("Done"),
      error => alert(error)
    )
  }

}
