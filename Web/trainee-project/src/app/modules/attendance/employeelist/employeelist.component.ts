import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AttendanceService } from '../attendance.service';


@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.scss']
})
export class EmployeelistComponent implements OnInit {
 @ViewChild('search') searchEle: ElementRef;
  
  employeeData: any;
  fillterList: any[];
  

  constructor(private attendanceService: AttendanceService) { }

  ngOnInit(): void {
    this.attendanceService.getAttendance().subscribe((res:any)=>{
      // console.log(res)
      this.employeeData = res.data
      // console.log(this.employeeData)
      this.fillterList = this.employeeData
     
       
    })
  }
  onKeyup(event) {
    let filter = this.searchEle.nativeElement.value.toLowerCase();
    console.log(filter)
    this.fillterList = this.employeeData.filter(res =>{
     return res.name.toLowerCase().startsWith(filter);
    }) 
  }
  

}
