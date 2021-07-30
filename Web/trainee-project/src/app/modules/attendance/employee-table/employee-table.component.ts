import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  employeeData: any;
  dataSource = new MatTableDataSource();



  constructor(
    private attendanceService: AttendanceService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.attendanceService.getAttendance().subscribe((res: any) => {
      // console.log(res)
      this.employeeData = res.data;
      // console.log(this.employeeData)
    });
  }

  openDialog(data1) {
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
    if(confirm("Are you sure to delete ")) {
    this.attendanceService.deleteAttendance(dataDelete).subscribe((res: any) => {
      if (res) {
        this.attendanceService.getAttendance().subscribe((res: any) => {
          this.employeeData = res.data
        })
      }else{
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
