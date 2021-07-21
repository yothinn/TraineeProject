import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { AddItemDialogComponent } from '../add-item-dialog/add-item-dialog.component';
import { PettycashService } from '../pettycash.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['วันที่', 'เลขที่เอกสาร', 'รายการ', 'รับเข้า', 'จ่าย', 'สถานที่ใช้งาน'];
  pdata: any;

  constructor(private pettycashService: PettycashService, public dialog: MatDialog) { }
  ngAfterViewInit(): void {
    this.pdata.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.pettycashService.getList().subscribe((res: any) => {
      console.log(res);
      this.pdata = res.data
      console.log(this.pdata);
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddItemDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
  createList(){
    let customerList: any ={
      documentNo: this.pdata ,
      list: this.pdata ,
      admit:this.pdata ,
      pay: this.pdata,
      placeOfUse: this.pdata

    };
    this.pettycashService.createCustomer(customerList).subscribe(
      success => alert("Done"),
      error => alert(error)
    )
  }

  



}




