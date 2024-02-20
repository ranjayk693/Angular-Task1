import { Component } from '@angular/core';
import { EmployeeManagementComponent } from '../employee-management/employee-management.component';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.scss',
  imports: [EmployeeManagementComponent],
})
export class EmployeeAddComponent {
  type = 'employee-add';
}
