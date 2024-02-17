import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';

export const routes: Routes = [
  { path: '', component: EmployeeListComponent },
  { path: 'AddEmployeeDetails', component: EmployeeAddComponent },
  { path: 'EditEmployeeDetails/:id', component: EmployeeEditComponent },
];
