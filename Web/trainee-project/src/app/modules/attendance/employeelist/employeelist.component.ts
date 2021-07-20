import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../attendance.service';


@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.scss']
})
export class EmployeelistComponent implements OnInit {

  employeeData: any;

  constructor(private attendanceService: AttendanceService) { }

  ngOnInit(): void {
    this.attendanceService.getAttendance().subscribe((res:any)=>{
      console.log(res);
      this.employeeData = res.data;
      console.log(this.employeeData);
    })
  }

}
