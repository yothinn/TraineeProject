import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../attendance.service';

@Component({
  selector: 'app-employeeprofile',
  templateUrl: './employeeprofile.component.html',
  styleUrls: ['./employeeprofile.component.scss']
})
export class EmployeeprofileComponent implements OnInit {
  employeeData: any;

  constructor(private attendanceService: AttendanceService) { }

  ngOnInit(): void {
    this.attendanceService.getAttendance().subscribe((res:any)=>{
      console.log(res)
      this.employeeData = res.data
      console.log(this.employeeData)
    })
  }

}
