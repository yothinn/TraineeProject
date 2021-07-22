import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddItemDialogComponent } from '../add-item-dialog/add-item-dialog.component';
import { PettyCashService } from '../pettycash.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnInit {
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

  ngAfterViewInit(): void {
    this.PettyCashData.paginator = this.paginator;
    console.log(this.PettyCashData.paginator);
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddItemDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  createList() {
    let customerList: any = {
      date: this.PettyCashData ,
      documentNo: this.PettyCashData,
      list: this.PettyCashData,
      admit: this.PettyCashData,
      pay: this.PettyCashData,
      placeOfUse: this.PettyCashData

    };
    this.pettycashService.createCustomer(customerList).subscribe(
      success => alert("Done"),
      error => alert(error)
    )
  }





}




