import { Component, OnInit } from '@angular/core';
import { PettyCashService } from '../pettyCash.service';

@Component({
  selector: 'app-sum',
  templateUrl: './sum.component.html',
  styleUrls: ['./sum.component.scss']
})
export class SumComponent implements OnInit {
  tableData: any;
  RaisedAmount: number;
  value: any;

  constructor(private pettyCashService: PettyCashService,) { }

  ngOnInit(): void {
    this.pettyCashService.onTableChangedObservable$.subscribe((res: any) => {
      this.tableData = res;
      this.findsum(this.tableData);
    });
  }

  public findsum(data) {
    this.RaisedAmount = 0;
    this.value = data;
    for (let j = 0; j < data.length; j++) {
      if (this.value[j].deposit) {
        this.RaisedAmount += this.value[j].deposit;
      } else {
        this.RaisedAmount -= this.value[j].withdraw;
      }
    }
  }

}
