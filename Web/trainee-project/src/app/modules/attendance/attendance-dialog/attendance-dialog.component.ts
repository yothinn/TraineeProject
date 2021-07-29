import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AttendanceService } from '../attendance.service';

@Component({
  selector: 'app-attendance-dialog',
  templateUrl: './attendance-dialog.component.html',
  styleUrls: ['./attendance-dialog.component.scss']
})
export class AttendanceDialogComponent implements OnInit {

  workDateForm: FormGroup;
  employeeData: any;
  selected = 'option2';
  
  constructor(private attendanceService: AttendanceService) { }

  ngOnInit(): void {

    this.attendanceService.getAttendance().subscribe((res:any)=>{
      this.employeeData = res.data;
     });
  }


  
}
