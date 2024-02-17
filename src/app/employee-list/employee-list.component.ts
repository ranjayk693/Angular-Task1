import { Component } from '@angular/core';
import { UsersDataService } from '../services/employee.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent {
  userData: any;
  employeeId: any;
  constructor(private DataItem: UsersDataService, private router: Router) {
    this.userData = DataItem.getData();
  }

  OnDeleteItem(id: number) {
    this.userData = this.DataItem.DeleteItem(id);
  }

  onAddEmployee() {
    this.router.navigate(['/AddEmployeeDetails']);
  }
}
