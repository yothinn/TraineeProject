
import { DatePipe } from '@angular/common';
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

  dateTimeInData: any;
  dateTimeOutData:any;

  pageEvent: any;
  currentPage = 0;
  pageSize = 5;
  array: any;
  totalSize = 0;
  dataSource: any;
  dataSource1: any;
 
  totalIn:any;
  totalOut:any;
  
  dateTimeData:any;
  totalTime:any;
  arrayTime:Array<any>;

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
      this.dateTimeInData = res.filter((res)=>{
        return res.work==="เข้างาน";
      })
  
      console.log(this.dateTimeInData)
    });


    this.attendanceService.onDateChangedObservable$.subscribe((res: any) => {
      // console.log(res)
      this.dateTimeOutData = res.filter((res)=>{
        return res.work==="ออกงาน";
      });
    });
    this.attendanceService.onDateChangedObservable$.subscribe((res:any)=>{
      this.dateTimeData = res;
      this.findsum(this.dateTimeData);
    })
  
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
      this.dataSource = new MatTableDataSource<Element>(this.dateTimeInData);
      this.dataSource.paginator = this.paginator;
      this.array = this.dateTimeInData;
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
      this.dataSource1 = new MatTableDataSource<Element>(this.dateTimeOutData);
      this.dataSource1.paginator = this.paginator;
      this.array = this.dateTimeOutData;
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

findsum(data){
 let sumIn = data.filter(res =>{ 
  
    if(res.work ==="เข้างาน"){     
      return res.time
    } 
 }) 
  let sumOut = data.filter(res =>{
    if(res.work === "ออกงาน"){
      return res.time
    }
  })
  this.totalIn = sumIn.map(res => res.time)
  this.totalOut = sumOut.map(res => res.time)
  // console.log( this.totalIn.length)
  // console.log( this.totalOut.length)
   
  for (let i = 0;i < this.totalIn.length && i < this.totalOut.length;i++) {
   
    let timeIn  = new Date(this.totalIn[i])
    let timeOut = new Date(this.totalOut[i])
    let total = timeOut.getTime() - timeIn.getTime()
    let hours = Math.floor(total / (60 * 60 * 1000))
    let minutes = Math.floor(total / (60 * 1000))  - (hours * 60);
    this.totalTime =  {hour: hours, minute: minutes}
    
    const zoo = {
    hour: this.totalTime.hour,
    minutes:this.totalTime.minutes,
    }; 
    this.arrayTime.push(zoo)

    console.log(this.arrayTime)
  }    


  // this.arrayTime = Object.entries(numbers);
  // console.log(this.arrayTime)
//  this.totalIn = sumIn.map(res => res.time)
//  this.totalIn  = new Date(this.totalIn)
//  console.log(this.totalIn.getHours())
 
//  this.totalOut = sumOut.map(res => res.time)
//  this.totalOut  = new Date(this.totalOut)
//  console.log( this.totalOut.getHours())

//  var total = this.totalOut.getTime() - this.totalIn.getTime()
//  console.log(total)
//  var hours = Math.floor(total / (60 * 60 * 1000))
//  console.log(this.totalOut.getTime())
//  var minutes = Math.floor(total / (60 * 1000))  - (hours * 60);

//  this.totalTime =  {hour: hours, minute: minutes}
//  console.log(this.totalTime)

}


    }


 











