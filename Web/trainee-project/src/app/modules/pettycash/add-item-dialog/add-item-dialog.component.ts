import { Component, Inject, OnInit } from '@angular/core';
import { PettyCashService } from '../pettyCash.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



interface placeOfUse {
  item: string;
}

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.scss']
})
export class AddItemDialogComponent implements OnInit {
  customerForm: FormGroup;
  pettyCashData: any;
  tableData: any;
  disableSelect = new FormControl(false);
  public showDateInput = false;

  constructor(private pettyCashService: PettyCashService, private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {

  }

  ngOnInit(): void {
    this.customerForm = this.createList(this.data);
    this.setvalue();
  }

  createList(data) {
    return this.fb.group({
      lastName: [data.lastName],
      date: [new Date(), [Validators.required]],
      documentNo: [data.documentNo, Validators.required],
      description: [data.description],
      deposit: [data.deposit],
      withdraw: [data.withdraw],
      placeOfUse: [data.placeOfUse, Validators.required]

    });
  }

  setvalue() {
    const form = this.customerForm
    form.controls['description'].setValue('เงินเข้า');
    form.controls['deposit'].setValue(0);
    form.controls['withdraw'].setValue(0);

  }

  onSubmit(): void {
    // if (confirm("กรุณาเลือกรายชื่อด้านซ้ายก่อน"))
    this.pettyCashService.createItem(this.customerForm.value).subscribe((res: any) => {
      this.tableData = res.data;
      if (res) {
        this.dialogRef.close(res);
      }
    });
    window.location.reload();
  }

  radioValueCheck(x) {
    this.showDateInput = (x === 1);
  }

  placeOfUses: placeOfUse[] = [
    { item: ' สนามบิน' },
    { item: ' สถานีขนส่ง' },
    { item: ' ร้านกาแฟ' },
    { item: ' สำนักงาน' },
    { item: ' ธนาคาร' },
    { item: ' คลินิก' },
    { item: ' ห้องสมุด' },
    { item: ' พิพิธภัณฑ์' },
    { item: ' โรงแรม' },
    { item: ' บ้าน' },
    { item: ' สำนักงาน' },
    { item: ' แผนกซ่อมบำรุง' },
  ];
}