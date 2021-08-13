
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  menu: boolean = false;
  dateTimeData: any;
  dateTimeOut:any;


  pageEvent: any;
  currentPage = 0;
  pageSize = 1;
  array: any;
  dataSource: any;
  totalSize = 0;

 

 


  constructor(
    private attendanceService: AttendanceService,
    public dialog: MatDialog,
    
  ) { }

  ngOnInit(): void {

   

    this.attendanceService.onDataChangedObservable$.subscribe((res: any) => {
      // console.log(res)
      this.employeeData = res;
      this.menu = true;
    });

    this.attendanceService.onDateChangedObservable$.subscribe((res: any) => {
      // console.log(res)
      this.dateTimeData = res;

    });


    this.attendanceService.onDateOutChangedObservable$.subscribe((res: any) => {
      // console.log(res)
      this.dateTimeOut = res;

    });
      this.getArray();
      // this.getArray1();
  }



  openDialog(data1) {
    // console.log(data1)
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
    if (confirm("Are you sure to delete")) {
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



  getArray():void{
    this.attendanceService.onDateChangedObservable$.subscribe((res:any) =>{
      this.dataSource = new MatTableDataSource<Element>(this.dateTimeData);
      this.dataSource.paginator = this.paginator;
      this.array = this.dateTimeData;
      this.totalSize = this.array.length;
      this.shoose();
      console.log(this.totalSize)
    });
  }

handlePage(pagin: any){
  this.currentPage = pagin.pageIndex;
  this.pageSize = pagin.pageSize;
  this.shoose();
  
}



shoose():void {
  const end = (this.currentPage + 1) * this.pageSize;
  const start = this.currentPage * this.pageSize;
  const part = this.array.slice(start,end)
  this.dataSource = part;
  
}


 






}




