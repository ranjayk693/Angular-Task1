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
      gender: 'Male',
      skills: [{ skill: 'HTML', experience: 'Beginner' }],
    },
    {
      id: 2,
      name: 'Mary',
      email: 'mary@gmail.com',
      contact: '896547854',
      gender: 'Female',
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
      gender: 'Male',
      skills: [{ skill: 'HTML', experience: 'Beginner' }],
    },
    {
      id: 4,
      name: 'Mickey',
      email: 'mickey@gmail.com',
      contact: '786547854',
      gender: 'Male',
      skills: [{ skill: 'HTML', experience: 'Beginner' }],
    },
    {
      id: 5,
      name: 'Minie',
      email: 'minie@gmail.com',
      contact: '789547854',
      gender: 'Female',
      skills: [{ skill: 'HTML', experience: 'Beginner' }],
    },
  ];

  // getData() {
  //   return this.UserData;
  // }
  // DeleteItem(id: number) {
  //   this.UserData = this.UserData.filter((data: any) => data.id != id);
  //   return this.UserData;
  // }

  getEmployee(): Observable<Employee[]> {
    return of(this.UserData);
  }

  getEmployeeById(id: number): Observable<Employee> {
    const employee:any = this.UserData.find((emp) => emp.id === id);
    return of(employee);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    employee.id = this.UserData.length + 1;
    this.UserData.push(employee);
    return of(employee);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    const index = this.UserData.findIndex((emp) => emp.id === employee.id);
    if (index !== -1) {
      this.UserData[index] = employee;
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
