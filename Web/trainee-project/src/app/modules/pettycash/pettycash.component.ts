import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';


@Component({
  selector: 'app-pettyCash',
  templateUrl: './pettyCash.component.html',
  styleUrls: ['./pettyCash.component.scss']
})
export class PettyCashComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddUserDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
