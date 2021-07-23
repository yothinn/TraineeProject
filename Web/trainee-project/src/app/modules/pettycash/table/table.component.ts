import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddItemDialogComponent } from '../add-item-dialog/add-item-dialog.component';
import { PettyCashService } from '../pettyCash.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['วันที่', 'เลขที่เอกสาร', 'รายการ', 'รับเข้า', 'จ่าย', 'สถานที่ใช้งาน'];
  PettyCashData: any;
  customerdata: any;

  constructor(private pettyCashService: PettyCashService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.pettyCashService.getList().subscribe((res: any) => {
      console.log(res);
      this.PettyCashData = res.data;
      console.log(this.PettyCashData);
    });
  }
  openDialog(data1) {
    const dialogRef = this.dialog.open(AddItemDialogComponent, {
      data:data1
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.pettyCashService.getList().subscribe((res: any) => {
          // console.log(res)
          this.customerdata = res.data
          // console.log(this.employeeData)
        })
      }
    })
  }
}