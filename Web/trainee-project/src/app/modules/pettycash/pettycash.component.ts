import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { PettyCashService } from './pettyCash.service';



@Component({
  selector: 'app-pettyCash',
  templateUrl: './pettyCash.component.html',
  styleUrls: ['./pettyCash.component.scss'],
  providers: [PettyCashService]
})
export class PettyCashComponent implements OnInit {
  @ViewChild('searchList') searchEle: ElementRef;
  pattyCashData: any;
  filterList: any[];



  constructor(private pettyCashService: PettyCashService, public dialog: MatDialog) { }

  ngOnInit() {
    this.pettyCashService.getList().subscribe((res: any) => {
      this.pattyCashData = res.data;
      this.filterList = this.pattyCashData.filter(res => {
        return res.name;
      })
    })
  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.pettyCashService.getList().subscribe();

      }
    })
  }

  openDialog2(data): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.pettyCashService.getList().subscribe((res: any) => {
          this.pattyCashData = res.data;
        })
      }
    })
  }
  deleteList(item): void {
    if (confirm("Are you sure to delete ")) {
      this.pettyCashService.deleteList(item).subscribe(res => {
        if (res) {
          this.pettyCashService.getList().subscribe((res: any) => {
            this.pattyCashData = res.data;
          })
        } else {
          console.log("error")
        }
      })
    }
    window.location.reload();
    // this.pettyCashService.deleteList(dataDelete).subscribe();

  }

  onKeyup():void {
    let filterData = this.searchEle.nativeElement.value.toLowerCase();
    console.log(filterData)
    this.pettyCashService.search(filterData)
    .subscribe((res: any) => {
      console.log(res)
      this.filterList = res.data
    });
  }
  onClick(data: any): void {
    this.pettyCashService.getListById(data._id);
    this.pettyCashService.getTableById(data.lastName);
    console.log(data.lastName);
  }
}
