import { Component,OnInit, ViewChild} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  @ViewChild('leftSide') left: MatDrawer;
  @ViewChild('rightSide') right: MatDrawer;
 
  constructor() { }

  ngOnInit(): void {
  }

  toggleLeft(): void{
    this.left.toggle();

  }

  toggleRight(): void{
    this.right.toggle();
  }

}
