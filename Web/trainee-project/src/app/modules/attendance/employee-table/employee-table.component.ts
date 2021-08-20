
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

  @ViewChild('paginator') paginator: MatPaginator;
 


  employeeData: any;
  menu: boolean = false;
  dateTimeData: any;
  dateTimeOut:any;
  dateTimeOutData:any;
  work:any;


  pageEvent: any;
  currentPage = 0;
  pageSize = 1;
  array: any;
  dataSource: any;
  totalSize = 0;

  dateTime:any;


  dateTimeDataOut:[];
  dataSource1: any;

  timeIn:any;
  timeOut:any;

 


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
      this.dateTimeData = res.filter((res)=>{
        return res.work==="เข้างาน";
      })
      console.log(this.dateTimeData)
    });


    this.attendanceService.onDateChangedObservable$.subscribe((res: any) => {
      // console.log(res)
      this.dateTimeDataOut = res.filter((res)=>{
        return res.work==="ออกงาน";
      });
     
      console.log(this.dateTimeDataOut)
     
    });

    
  
      this.getArray();
      this.getArray1();


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
      // console.log(this.totalSize)
    });
  }

handlePage(pagin: any){
  this.currentPage = pagin.pageIndex;
  this.pageSize = pagin.pageSize;
  this.shoose();
  this.shoose1();
  
}



shoose():void {
  const end = (this.currentPage + 1) * this.pageSize;
  const start = this.currentPage * this.pageSize;
  const part = this.array.slice(start,end)
  this.dataSource = part;
  
}


  getArray1():void{
    this.attendanceService.onDateChangedObservable$.subscribe((res:any) =>{
      this.dataSource1 = new MatTableDataSource<Element>(this.dateTimeDataOut);
      this.dataSource1.paginator = this.paginator;
      this.array = this.dateTimeDataOut;
      this.totalSize = this.array.length;
      this.shoose1();
      // console.log(this.totalSize)
    });
  }

handlePage1(pagin: any){
  this.currentPage = pagin.pageIndex;
  this.pageSize = pagin.pageSize;
  this.shoose1();
  
}

shoose1():void {
  const end = (this.currentPage + 1) * this.pageSize;
  const start = this.currentPage * this.pageSize;
  const part = this.array.slice(start,end)
  this.dataSource1 = part;
  
}

CalculateTime(startDate,endDate):void {
  this.timeIn  = this.dateTimeData
  this.timeOut =this.dateTimeDataOut
  

  var diff = endDate.getTime() - startDate.getTime();
  console.log( diff)
}

// var diff = endDate.getTime() - startDate.getTime();
// var days = Math.floor(diff / (60 * 60 * 24 * 1000));
// var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
// var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
// var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
// return { day: days, hour: hours, minute: minutes, second: seconds };

    }


 











