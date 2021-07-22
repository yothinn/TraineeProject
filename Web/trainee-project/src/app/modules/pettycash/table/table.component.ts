import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { AddItemDialogComponent } from '../add-item-dialog/add-item-dialog.component';
import { PettyCashService } from '../pettycash.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['วันที่', 'เลขที่เอกสาร', 'รายการ', 'รับเข้า', 'จ่าย', 'สถานที่ใช้งาน'];
  PettyCashData: any;

  constructor(private pettycashService: PettyCashService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.pettycashService.getList().subscribe((res: any) => {
      console.log(res);
      this.PettyCashData = res.data;
      console.log(this.PettyCashData);
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddItemDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}