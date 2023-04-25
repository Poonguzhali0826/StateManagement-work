import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../service/http.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CRUDComponent implements OnInit {
  modalRef!: BsModalRef;

  registerForm: FormGroup | any;
  submitted = false;
  key!: string;
  employeeDetails: any;
  employeeId: any;
  constructor(
    private formBuilder: FormBuilder,
    private httpservice: HttpService,
    private modalService: BsModalService
  ) { }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      phoneNo: ['', Validators.required],
      exp: ['', Validators.required],
      package: ['', Validators.required]
    });
    this.getEmployeeDetails();
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {

      return;
    }
    console.log('this.registerForm', this.registerForm)
    const payload = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      phoneNo: this.registerForm.value.phoneNo,
      exp: this.registerForm.value.exp,
      package: this.registerForm.value.package
    }
    if (this.key == 'add') {
      this.httpservice.createEmployee(payload).subscribe((result: any) => {
        console.log('cfreateEmployee', result)
        this.modalRef.hide();
        this.getEmployeeDetails()       //call the get api after create inside subscribe(Res)
      })
    } else if (this.key = 'edit') {
      this.httpservice.updateEmployee(this.employeeId, payload).subscribe((result: any) => {
        console.log('updatedEmployee', result)
        this.modalRef.hide();
        this.getEmployeeDetails()        //call the get api after delete inside subscribe(Res)
      })
    }


  }

  getEmployeeDetails() {
    this.httpservice.getEmployee().subscribe((res: any) => {
      this.employeeDetails = res;
      console.log('employeeDetails', this.employeeDetails)
    })
  }



  addEditModal(template: TemplateRef<any>, key: string, id: any) {
    this.key = key;
    this.employeeId = id;
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    if (key == 'edit') {
      const filter = this.employeeDetails.filter((item: any) => item.id == id);
      console.log('filter', filter)
      this.registerForm.patchValue({
        firstName: filter[0].firstName,  //formcontrolName firstName: server data firstName
        lastName: filter[0].lastName,
        email: filter[0].email,
        phoneNo: filter[0].phoneNo,
        exp: filter[0].exp,
        package: filter[0].package
      })
    } else if (key == 'add') {
      this.registerForm.reset();
    }
  }
  close() {
    this.modalRef.hide();
  }

  deleteModal(template: TemplateRef<any>, id: any) {
    this.employeeId = id;
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }
  deleteDetails() {
    this.httpservice.EmployeeDelete(this.employeeId).subscribe((result: any) => {
      console.log('result', result);
      this.modalRef.hide();
      this.getEmployeeDetails();     //call the get api after delete inside subscribe(Res)

    })
  }
}
