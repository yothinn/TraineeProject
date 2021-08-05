import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AttendanceService } from '../attendance.service';
import { DialogAddComponent } from '../dialog-add/dialog-add.component';


@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss']
})
export class EmployeeTableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  // displayedColumns: any[] = ['id', 'name', 'lastname', 'tel'];

  employeeData: any;
  dataSource = new MatTableDataSource();
  menu: boolean = false;



  constructor(
    private attendanceService: AttendanceService,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.attendanceService.getAttendance().subscribe((res: any) => {
      // console.log(res)
      this.employeeData = res.data;
      // console.log(this.employeeData) 

    });
    this.attendanceService.onDataChangedObservable$.subscribe((res: any) => {
      console.log(res)
      this.employeeData = res;
      this.menu = true;
    });
  }

  openDialog(data1) {
    console.log(data1)
    const dialogRef = this.dialog.open(DialogAddComponent, {
      data: data1
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.attendanceService.getAttendance().subscribe((res: any) => {
          // console.log(res)
          this.employeeData = res.data
          // console.log(this.employeeData)
        })
      }
    })
  }

  delete(dataDelete) {
    if (confirm("Are you sure to delete ")) {
      this.attendanceService.deleteAttendance(dataDelete).subscribe((res: any) => {
        if (res) {
          this.attendanceService.getAttendance().subscribe((res: any) => {
            this.employeeData = res.data
          })
        } else {
          console.log("")
          
        }
      })
    }
  }
}

// openConfirmDialog(){
  //   const dialogRef = this.dialog.open(ConfirmdialogComponent);
  //   dialogRef.afterClosed().subscribe(result => {
  //     // console.log(`Dialog result: ${result}`)
  //   });
  //   dialogRef.afterClosed().subscribe(res => {
  //     if (res) {
  //       this.attendanceService.getAttendance().subscribe((res: any) => {
  //         // console.log(res)
  //         this.employeeData = res.data
  //         // console.log(this.employeeData)
  //       })
  //     }
  //   })
  // }
