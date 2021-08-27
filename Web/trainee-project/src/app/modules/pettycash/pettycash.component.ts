import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { PettyCashService } from './pettyCash.service';




@Component({
  selector: 'app-pettyCash',
  templateUrl: './pettyCash.component.html',
  styleUrls: ['./pettyCash.component.scss'],
  providers: [PettyCashService]
})
export class PettyCashComponent implements OnInit, AfterViewInit {
  @ViewChild('searchList') searchEle: ElementRef;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  pettyCashData: any;
  filterList: any[];
  // pageEvent: any;
  // array: any;
  // dataSource: any;
  // pageSize = 5;
  // currentPage = 0;
  // totalSize = 0;



  constructor(private pettyCashService: PettyCashService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.pettyCashService.getList().subscribe((res: any) => {
      this.pettyCashData = res.data;
      this.filterList = this.pettyCashData.filter(res => {
        return res.lastName;
      });
    });
    // this.getArray();
  }

  ngAfterViewInit(): void {
    
  }
  openDialog(data): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: "400px",
      data:data
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.pettyCashService.getList().subscribe((res: any) => {
          this.pettyCashData = res;
        });
      }
    });
  }

  deleteList(item): void {
    if (confirm("Are you sure to delete ")) {
      this.pettyCashService.deleteList(item).subscribe(res => {
        if (res) {
          this.pettyCashService.getList().subscribe((res: any) => {
            this.pettyCashData = res.data;
          });
        } else {
          console.log("error");
        }
      });
    }
    window.location.reload();
  }

  onKeyup(): void {
    let filterData = this.searchEle.nativeElement.value.toLowerCase();
    console.log(filterData)
    this.pettyCashService.search(filterData)
      .subscribe((res: any) => {
        console.log(res);
        this.filterList = res.data;
      });
  }
  onClick(data: any): void {
    this.pettyCashService.getListById(data._id);
    this.pettyCashService.getTableById(data.lastName);
    console.log(data.lastName);
  }

  // filter(customer): any{
  //   if (customer) {
  //     this.pettyCashService.getList().subscribe((res: any) => {
  //       this.pettyCashData = res.data.filter((res) => {
  //         return res.lastName;
  //       })
  //     })
  //   } else {
  //     this.pettyCashService.getList().subscribe((res: any) => {
  //       this.pettyCashData = res.data;
  //     })
  //   }
  // }


  // handlePage(pagin: any): void {
  //   this.currentPage = pagin.pageIndex;
  //   this.pageSize = pagin.pageSize;
  //   this.shoose();
  // }
  
  // getArray(): void {
  //   this.pettyCashService.onTableChangedObservable$
  //     .subscribe((res: any) => {
  //       this.pettyCashData = new MatTableDataSource<Element>(res.data);
  //       this.pettyCashData.paginator = this.paginator;
  //       this.array = res.data;
  //       this.totalSize = this.array.length;
  //       this.shoose();
  //       console.log(this.totalSize);
  //     });
  // }
  
  // shoose(): void {
  //   const end = (this.currentPage + 1) * this.pageSize;
  //   const start = this.currentPage * this.pageSize;
  //   const part = this.array.slice(start, end);
  //   this.pettyCashData = part;
  // }
}
