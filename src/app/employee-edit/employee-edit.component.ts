import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { EmployeeAddComponent } from '../employee-add/employee-add.component';
import { EmployeeManagementComponent } from '../employee-management/employee-management.component';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.scss',
  imports: [RouterOutlet, EmployeeAddComponent, EmployeeManagementComponent],
})
export class EmployeeEditComponent {
  employee_id: any;
  constructor(private route: ActivatedRoute) {}

  type = 'employee-edit';
  ngOnInit() {
    // Sending the id of employee to the employee-mangement compunent
    this.employee_id = this.route.snapshot.paramMap.get('id');
  }
}
