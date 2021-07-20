import { Component,OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { AttendanceService } from './attendance.service';
import { DialogAddComponent } from './dialog-add/dialog-add.component';



@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  @ViewChild('leftSide') left: MatDrawer;
  @ViewChild('rightSide') right: MatDrawer;
  employeeData: any;
  
  constructor(
    private attendanceService: AttendanceService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.attendanceService.getAttendance().subscribe((res:any)=>{
      console.log(res)
      this.employeeData = res.data
      console.log(this.employeeData)
    })
  }
  openDialog() {
     this.dialog.open( DialogAddComponent);
  }
  

  toggleLeft(): void{
    this.left.toggle();

  }

  toggleRight(): void{
    this.right.toggle();
  }

}


