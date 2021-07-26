import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { PettyCashService } from './pettyCash.service';
import { UpdateCuctomerComponent } from './update-cuctomer/update-cuctomer.component';


@Component({
  selector: 'app-pettyCash',
  templateUrl: './pettyCash.component.html',
  styleUrls: ['./pettyCash.component.scss']
})
export class PettyCashComponent implements OnInit {
  customerdata: any;
  pattyCashData: any;
  filterList: any[];
  
  constructor(private pettyCashService: PettyCashService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.pettyCashService.getList().subscribe((res: any) => {
      this.pattyCashData = res.data
      this.filterList = this.pattyCashData.filter(res => {
        return res.name
      })

    })
  }

  openDialog(data) {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.pettyCashService.getList().subscribe()

      }
    })
  }

  openDialog2(data) {
    const dialogRef = this.dialog.open(UpdateCuctomerComponent, {
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
  deleteList(dataDelete) {
    this.pettyCashService.deleteList(dataDelete).subscribe()
  }
}
