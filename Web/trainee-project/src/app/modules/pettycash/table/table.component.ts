import { AfterViewInit,Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { PettycashService } from '../pettycash.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit,OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  pdata: any;

  constructor(private pettycashService: PettycashService) { }
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

  displayedColumns: string[] = ['วันที่', 'เลขที่เอกสาร', 'รายการ', 'รับเข้า', 'จ่าย', 'สถานที่ใช้งาน'];



}




