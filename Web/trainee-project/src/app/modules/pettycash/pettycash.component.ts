import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { PettyCashService } from './pettyCash.service';


@Component({
  selector: 'app-pettyCash',
  templateUrl: './pettyCash.component.html',
  styleUrls: ['./pettyCash.component.scss']
})
export class PettyCashComponent implements OnInit {
  customerdata : any
  constructor(private pettyCashService: PettyCashService,public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(data1) {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
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
