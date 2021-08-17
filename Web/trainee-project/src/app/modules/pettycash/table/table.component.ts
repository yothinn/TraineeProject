import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddItemDialogComponent } from '../add-item-dialog/add-item-dialog.component';
import { PettyCashService } from '../pettyCash.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Element } from '@angular/compiler';




@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  listData: any;
  customerdata: any;
  pageEvent: any;
  array: any;
  dataSource: any;
  pageSize = 5;
  currentPage = 0;
  totalSize = 0;
  listCustomer: any;
  tableData: any;
  value: any;
  RaisedAmount = 0;
  sumData: any;
  checkData: boolean = true;


  constructor(
    private pettyCashService: PettyCashService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.pettyCashService.onTableChangedObservable$.subscribe((res: any) => {
      this.tableData = res;
      console.log(this.checkData);
      if (this.checkData === true) {
        this.findsum(this.tableData);
      }
    });
    this.pettyCashService.onListChangedObservable$.subscribe((res: any) => {
      this.listData = res;
      console.log(res);
    });

    this.getArray();
  }
  openDialog(data): void {
    if (data === undefined) {
      confirm('กรุณาเลือกการ์ดผู้ใช้ก่อน')
    } else {
      const dialogRef = this.dialog.open(AddItemDialogComponent, {
        data: data
      });
      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          this.pettyCashService.onTableChangedObservable$.subscribe((res: any) => {
            this.tableData = res;
          });
        }
      });
    }


  }

  handlePage(pagin: any): void {
    this.currentPage = pagin.pageIndex;
    this.pageSize = pagin.pageSize;
    this.shoose();
  }

  getArray(): void {
    this.pettyCashService.onTableChangedObservable$
      .subscribe((res: any) => {
        this.dataSource = new MatTableDataSource<Element>(res);
        this.dataSource.paginator = this.paginator;
        this.array = res;
        this.totalSize = this.array.length;
        this.shoose();
        console.log(this.totalSize)
      });
  }

  shoose(): void {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
  }


  findsum(data) {
    this.checkData = false;
    this.value = data;
    console.log(data)
    for (let j = 0; j < data.length; j++) {
      console.log(this.value[j].deposit)
      if (this.value[j].deposit) {
        this.RaisedAmount += this.value[j].deposit;
      } else {
        this.RaisedAmount -= this.value[j].withdraw;
      }
      // console.log(this.RaisedAmount);
    }
  }

}
