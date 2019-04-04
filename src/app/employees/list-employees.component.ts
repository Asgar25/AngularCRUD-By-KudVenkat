import { ResolveEmployeeList } from './resolved-employeelist.model';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  // selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees: Employee[];
  filteredEmployees: Employee[];

  error: string;
  private _searchTerm: string;

  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEmployees = this.filtereEmployees(value);
  }

  filtereEmployees(searchString: string) {
    return this.employees.filter(employee =>
      employee.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  constructor(private _router: Router, private _route: ActivatedRoute) {
   const resolvedData: Employee[] | string = this.employees = this._route.snapshot.data['employeeList'];
   if (Array.isArray(resolvedData)) {
     this.employees = resolvedData;
   } else {
     this.error = resolvedData;

   }
   if (this._route.snapshot.queryParamMap.has('searchTerm')) {
      this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
    } else {
      this.filteredEmployees = this.employees;
    }
  }

  onDeleteNotification(id: number) {
    const i = this.filteredEmployees.findIndex(e => e.id === id);
    if (i !== -1) {
      this.filteredEmployees.splice(i, 1);
    }
    }


  ngOnInit() {

  }
  /* this method is use for to check the next employee */
  /*
    nextEmployee(): void {
      if (this.arrayIndex <= 2 ) {

        this.employeeToDisplay = this.employees[this.arrayIndex];
        this.arrayIndex++;
      } else {
        this.employeeToDisplay = this.employees[0];
        this.arrayIndex = 1;
      }

    } */

    // this code was for Change the employee name on Home Page
//  changeEmployeeName() {
//    this.employees[0].name = 'Jordan';
 //   this.filteredEmployees = this.filtereEmployees(this.searchTerm);
    // const newEmployeeArray: Employee[] = Object.assign([], this.employees);
    // newEmployeeArray[0].name = 'jordan';
    // this.employees = newEmployeeArray;
 // }

  /*    onMouseMove () {

     } */

}
