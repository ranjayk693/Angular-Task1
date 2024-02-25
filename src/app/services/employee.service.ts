import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class UsersDataService {
  constructor() {}

  UserData = [
    {
      id: 1,
      name: 'John',
      email: 'john@gmail.com',
      contact: '896547854',
      gender: 'male',
      skills: [{ skill: 'HTML', experience: 'Intermediate' }],
    },
    {
      id: 2,
      name: 'Mary',
      email: 'mary@gmail.com',
      contact: '896547854',
      gender: 'female',
      skills: [
        { skill: 'HTML', experience: 'Beginner' },
        { skill: 'CSS', experience: 'Beginner' },
        { skill: 'Management', experience: 'Beginner' },
      ],
    },
    {
      id: 3,
      name: 'Victor',
      email: 'victor@gmail.com',
      contact: '996547854',
      gender: 'male',
      skills: [{ skill: 'HTML', experience: 'Beginner' }],
    },
    {
      id: 4,
      name: 'Mickey',
      email: 'mickey@gmail.com',
      contact: '786547854',
      gender: 'male',
      skills: [{ skill: 'HTML', experience: 'Beginner' }],
    },
    {
      id: 5,
      name: 'Minie',
      email: 'minie@gmail.com',
      contact: '789547854',
      gender: 'female',
      skills: [{ skill: 'HTML', experience: 'Beginner' }],
    },
  ];

  getEmployee(): Observable<Employee[]> {
    return of(this.UserData);
  }

  getEmployeeById(id: number): Observable<Employee> {
    const employee: any = this.UserData.find((emp) => emp.id === id);
    return of(employee);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    const existingEmployee = this.UserData.find(
      (emp) => emp.id === employee.id
    );
    if (existingEmployee) {
      alert('Duplicate ID are not allowed');
    } else {
      this.UserData.push(employee);
      alert('Data is added sucessfully');
    }
    return of(employee);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    const index = this.UserData.findIndex((emp) => emp.id === employee.id);
    if (index !== -1) {
      this.UserData[index] = employee;
      alert('Data is Updated sucessfully');
    }
    return of(employee);
  }

  deleteEmployee(id: number): Observable<void> {
    const index = this.UserData.findIndex((emp) => emp.id === id);
    if (index !== -1) {
      this.UserData.splice(index, 1);
    }
    return of();
  }
}
