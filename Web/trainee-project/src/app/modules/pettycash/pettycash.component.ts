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
  searchList: any[];



  constructor(private pettyCashService: PettyCashService, public dialog: MatDialog) { }

  ngOnInit() {
    this.pettyCashService.getList().subscribe((res: any) => {
      this.pattyCashData = res.data;
      this.filterList = this.pattyCashData.filter(res => {
        return res.name;
      })
      this.searchList = this.filterList
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
  deleteList(dataDelete): void {
    if (confirm("Are you sure to delete ")) {
      this.pettyCashService.deleteList(dataDelete).subscribe((res: any) => {
        if (res) {
          this.pettyCashService.getList().subscribe((res: any) => {
            this.pattyCashData = res.data
          })
        } else {
          console.log("")
        }
      })
    } window.location.reload();
    // this.pettyCashService.deleteList(dataDelete).subscribe();

  }

  onKeyup() {
    let filter = this.searchEle.nativeElement.value.toLowerCase();
    console.log(filter)
    this.filterList = this.searchList.filter(res => {
      console.log(res)
      return res.name.toLowerCase().startsWith(filter);
    });
  }
  onClick(data){
    this.pettyCashService.onClickCard(data)
  }
}
