import { Component, Input } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { Employee } from '../models/employee';
import { UsersDataService } from '../services/employee.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-employee-management',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './employee-management.component.html',
  styleUrl: './employee-management.component.scss',
})
export class EmployeeManagementComponent {
  @Input() id: string = '';
  @Input() compunent: string = '';

  ButtonText = '';
  EmployeeForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private employeeService: UsersDataService
  ) {
    this.EmployeeForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      contact: ['', Validators.required],
      gender: ['', Validators.required],
      skills: this.fb.array([this.SkillData()]),
    });
  }

  SkillData() {
    return this.fb.group({
      skill: ['', Validators.required],
      experience: ['none', Validators.required],
    });
  }

  GetData(item: any) {
    return item.map((element: any, index: number) => {
      return this.fb.group({
        skill: [element.skill, Validators.required],
        experience: [element.experience, Validators.required],
      });
    });
  }

  get skills(): FormArray {
    return this.EmployeeForm.get('skills') as FormArray;
  }

  onSubmitButton(): void {
    if (this.EmployeeForm.valid && this.compunent == 'employee-add') {
      const employee: Employee = {
        id: this.EmployeeForm.get('id')!.value, // You can set this to null or generate a unique ID
        name: this.EmployeeForm.get('name')!.value,
        email: this.EmployeeForm.get('email')!.value,
        contact: this.EmployeeForm.get('contact')!.value,
        gender: this.EmployeeForm.get('gender')!.value,
        skills: this.EmployeeForm.get('skills')!.value,
      };
      this.employeeService.addEmployee(employee);
      alert("Data is added sucessfully")
      return;
    } else if (this.EmployeeForm.valid && this.compunent == 'employee-edit') {
      const employee: Employee = {
        id: this.EmployeeForm.get('id')!.value, // You can set this to null or generate a unique ID
        name: this.EmployeeForm.get('name')!.value,
        email: this.EmployeeForm.get('email')!.value,
        contact: this.EmployeeForm.get('contact')!.value,
        gender: this.EmployeeForm.get('gender')!.value,
        skills: this.EmployeeForm.get('skills')!.value,
      };
      this.employeeService.updateEmployee(employee);
      alert("Data is Updated sucessfully")
      return;
    } else {
      // console.log('validation require ');
      alert("All fields are mendatary")
    }
  }

  onAddSkillButton(): void {
    if (this.skills) {
      this.skills.push(this.SkillData());
    }
    
  }

  onDeleteButton(index: number): void {
    if (this.skills) {
      this.skills.removeAt(index);
    }
  }

  ngOnInit() {
    this.ButtonText = this.compunent === 'employee-edit' ? 'Update' : 'Submit';
    if (this.id) {
      const UserData = this.employeeService.UserData.filter((element) => {
        return element.id.toString() == this.id;
      });

      this.EmployeeForm = this.fb.group({
        id: [{value:UserData[0].id,disabled:true}, Validators.required],
        name: [UserData[0].name, Validators.required],
        email: [UserData[0].email, Validators.required],
        contact: [UserData[0].contact, Validators.required],
        gender: [UserData[0].gender, Validators.required],
        skills: this.fb.array(this.GetData(UserData[0].skills)),
      });
    }
  }
}
