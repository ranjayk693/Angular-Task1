import { Component } from '@angular/core';
import { UsersDataService } from '../services/employee.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent {
  userData: Employee[] = [];
  constructor(
    private router: Router,
    private employeeService: UsersDataService
  ) {}

  ngOnInit(): void {
    this.employeeService
      .getEmployee()
      .subscribe((employees) => (this.userData = employees));
  }

  OnDeleteItem(id: number): void {
    if (!confirm('Press OK to delete the item')) {
      return;
    }
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.userData = this.userData.filter((emp) => emp.id !== id);
    });
  }

  onAddEmployee() {
    this.router.navigate(['/AddEmployeeDetails']);
  }
}
