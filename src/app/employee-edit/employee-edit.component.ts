import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.scss',
})
export class EmployeeEditComponent {
  employee_id: any;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.employee_id = this.route.snapshot.paramMap.get('id');
  }
}
