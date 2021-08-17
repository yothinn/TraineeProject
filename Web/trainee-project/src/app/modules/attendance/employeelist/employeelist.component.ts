import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AttendanceService } from '../attendance.service';


@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.scss']
})
export class EmployeeListComponent implements OnInit {

  @ViewChild('search') searchEle: ElementRef;
  
  
  employeeListData: any;
  employeeData: any;
  filterList: any[];
  

  constructor(
    private attendanceService: AttendanceService,) { }

  ngOnInit(): void {
    this.attendanceService.getAttendance().subscribe((res:any)=>{
      // console.log(res)
      this.employeeData = res.data;
      // console.log(this.employeeData)
      this.filterList = this.employeeData;
     
       
    });
  }
  onKeyup(event): void {
    let filter = this.searchEle.nativeElement.value.toLowerCase();
     this.attendanceService.searchEmployee(filter)
      .subscribe((res) => {
        console.log(res);
        this.filterList = res.data;
      })
  }
  
  onChooseEmployee(item) {
    // console.log(item)
    this.attendanceService.getProfileById(item) 
    this.attendanceService.getDateTimeById(item)
    this.attendanceService.getWorkById(item)
   
    
     
  }



}
