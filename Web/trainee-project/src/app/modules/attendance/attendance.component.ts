import { Component,OnInit, ViewChild} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AttendanceService } from './attendance.service';


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  @ViewChild('leftSide') left: MatDrawer;
  @ViewChild('rightSide') right: MatDrawer;
  employeeData: any;
 
  constructor(private attendanceService: AttendanceService) { }

  ngOnInit(): void {
    this.attendanceService.getAttendance().subscribe((res:any)=>{
      console.log(res)
      this.employeeData = res.data
      console.log(this.employeeData)
    })
  }

  toggleLeft(): void{
    this.left.toggle();

  }

  toggleRight(): void{
    this.right.toggle();
  }

}
