import { Employee } from './../models/employee.model';
import { Department } from './../models/department.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-employees',
  templateUrl: './create-employees.component.html',
  styleUrls: ['./create-employees.component.css']
})
export class CreateEmployeesComponent implements OnInit {
  panelTitle: string;

  @ViewChild('employeeForm') public createEmployeeForm: NgForm;

  previewPhoto = false;

  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Developer' },
    { id: 5, name: 'Payroll' },
    { id: 6, name: 'Admin' }

  ];

   employee: Employee;
  // gender = 'female'; this is used for when load the main page so bydefault the Gender property is checked as female

 // isActive = true;
 // department = '3'; this is use to bydefault set the value in dropdown list
  constructor(private _employeeService: EmployeeService,
              private _router: Router,
              private _route: ActivatedRoute) { }

  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto ;
  }

  ngOnInit() {
    this._route.paramMap.subscribe(parameterMap => {
    const id = +parameterMap.get('id');
    this.getEmployee(id);
    });
  }

  private getEmployee(id: number) {
    if (id === 0) {
      this.employee = {
        id: null,
        name: null,
        gender: null,
        contactPreference: null,
        phoneNumber: null,
        email: '',
        dateOfBirth: null,
        department: 'select',
        isActive: null,
        photoPath: null,
      };
      this.panelTitle = 'Create Employee';
      this.createEmployeeForm.reset();
    } else {
      this.panelTitle = 'Edit Employee';
      this._employeeService.getEmployee(id).subscribe(
        (employee) => this.employee = employee,
        (err: any) => console.log(err)
      );
    }
  }


  saveEmployee(): void {
    if (this.employee.id == null) {
    this._employeeService.addEmployee(this.employee).subscribe(
      (data: Employee) => {
        console.log(data);
        this.createEmployeeForm.reset();
        this._router.navigate(['list']);
      },
      (error: any) => console.log(error)
    );
  } else {
    this._employeeService.updateEmployee(this.employee).subscribe(
      () => {
        this.createEmployeeForm.reset();
        this._router.navigate(['list']);
      },
      (error: any) => console.log(error)
    );
  }
}
}
