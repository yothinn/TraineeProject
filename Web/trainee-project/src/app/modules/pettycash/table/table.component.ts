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
  PettyCashData: any;
  customerdata: any;
  pageEvent: any;
  array: any;
  dataSource: any;
  pageSize = 2;
  currentPage = 0;
  totalSize = 0;
  listCustomer: any;

  constructor(private pettyCashService: PettyCashService, public dialog: MatDialog) { }

  ngOnInit() {
    this.pettyCashService.onDataChangedObservable$.subscribe(res =>{
      this.PettyCashData = res;
      // console.log(res)
    })
    this.getArray();
  }
  openDialog(data): void {
    const dialogRef = this.dialog.open(AddItemDialogComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.pettyCashService.getList().subscribe();
      }
    })
  }

  handlePage(pagin: any):void {
    this.currentPage = pagin.pageIndex;
    this.pageSize = pagin.pageSize;
    this.iterator();
    console.log(this.currentPage)
  }

  getArray():void{
    this.pettyCashService.onDataChangedObservable$
      .subscribe(res => {
        this.dataSource = new MatTableDataSource<Element>(this.PettyCashData);
        this.dataSource.paginator = this.paginator;
        this.array = this.PettyCashData;
        this.totalSize = this.array.length;
        this.iterator();
        console.log(this.totalSize)
      });
  }

  iterator():void {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
    
  }

}
