import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {
  // chhild component
  @Input() employee: Employee;
  selectedEmployeeId: number;

  @Input() searchTerm: string;

  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();

  confirmDelete = false;
  // panelExpanded = true;
  isHidden = false;
  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _employeeService: EmployeeService) { }

  ngOnInit() {

   this.selectedEmployeeId =  +this._route.snapshot.paramMap.get('id');
  }

  /* this is method is used for check the property value on consol */
  /* ngOnChanges(changes: SimpleChanges) {
    const previousEmployee = <Employee>changes.employee.previousValue;
    const currentEmployee = <Employee>changes.employee.currentValue;

    console.log('Previous :' + (previousEmployee ? previousEmployee.name : 'null'));
    console.log('Current: ' + currentEmployee.name);
   // console.log(changes);
  } */

  viewEmployee() {
    this._router.navigate(['/employees', this.employee.id], {
      queryParams: { 'searchTerm': this.searchTerm}
    });
  }
  editEmployee() {
    this._router.navigate(['/edit', this.employee.id]);
  }

  deleteEmployee() {
    this._employeeService.deleteEmployee(this.employee.id).subscribe(
      () => console.log(`Employee with Id = ${this.employee.id} deleted`),
      (err) => console.log(err)
    );
    this.notifyDelete.emit(this.employee.id);
  }
}
