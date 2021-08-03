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
  

  constructor(private attendanceService: AttendanceService) { }

  ngOnInit(): void {
    this.attendanceService.getAttendance().subscribe((res:any)=>{
      // console.log(res)
      this.employeeData = res.data;
      // console.log(this.employeeData)
      this.filterList = this.employeeData;
     
       
    });
  }
  onKeyup(event) {
    let filter = this.searchEle.nativeElement.value.toLowerCase();
    console.log(filter)
    this.filterList = this.employeeData.filter(res =>{
      console.log(res)
     return res.name.toLowerCase().startsWith(filter);
     
    });
  }
  
  onChooseEmployee(item) {
    this.attendanceService.getEmployeeById(item._id).subscribe((res: any) => {
      console.log(res);
      this.employeeListData = res.data;
      // return this.employeeListData(item.id)
    });
  }

}
