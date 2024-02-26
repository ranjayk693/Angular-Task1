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
import { JsonPipe, NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-management',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, NgClass],
  templateUrl: './employee-management.component.html',
  styleUrl: './employee-management.component.scss',
})
export class EmployeeManagementComponent {
  // Geeting data two compunenets
  @Input() id: string = '';
  @Input() compunent: string = '';

  ButtonText = '';

  // Reactive form Group
  EmployeeForm: FormGroup;

  // Constructor for initilization of data
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private employeeService: UsersDataService,
  ) {
    // Initilization of form
    this.EmployeeForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', Validators.required],
      gender: ['', Validators.required],
      skills: this.fb.array([this.SkillData()]),
    });
  }

  // Fuction for Initilization of skill and experince 
  SkillData() {
    return this.fb.group({
      skill: ['', Validators.required],
      experience: ['none', Validators.required],
    });
  }

  // Function to add the skill and experince 
  GetData(item: any) {
    return item.map((element: any, index: number) => {
      return this.fb.group({
        skill: [element.skill, Validators.required],
        experience: [element.experience, Validators.required],
      });
    });
  }

  // Getter method
  get skills(): FormArray {
    return this.EmployeeForm.get('skills') as FormArray;
  }

  // Function for Validation of Dropdown
  validateDropdown(): boolean {
    const skillsArray = this.EmployeeForm.get('skills') as FormArray;
    for(let i=0;i<skillsArray.length;i++){
      const skillGroup = skillsArray.at(i) as FormGroup;
      const experienceControl = skillGroup.get('experience');
      const experienceValue = experienceControl?.value;
      if (experienceValue === 'none') {
        return true;
      }
    }
    return false;
  }

  //Submit button Function
  onSubmitButton(): void {
    // Validate the dropdown options
    if (this.validateDropdown()) {
      alert('Please select the experince');
      return;
    }
    // If Form is valid and it is for add compunent then this will going to execute
    if (this.EmployeeForm.valid && this.compunent == 'employee-add') {
      const employee: Employee = {
        id: this.EmployeeForm.get('id')!.value, 
        name: this.EmployeeForm.get('name')!.value,
        email: this.EmployeeForm.get('email')!.value,
        contact: this.EmployeeForm.get('contact')!.value,
        gender: this.EmployeeForm.get('gender')!.value,
        skills: this.EmployeeForm.get('skills')!.value,
      };
      // Adding the data by calling service
      this.employeeService.addEmployee(employee)
      // Navigate to the home page
      this.router.navigate(['']);
    }
    // If Form is valid and it is for edit compunent then this will going to execute
     else if (this.EmployeeForm.valid && this.compunent == 'employee-edit') {
      const employee: Employee = {
        id: this.EmployeeForm.get('id')!.value, 
        name: this.EmployeeForm.get('name')!.value,
        email: this.EmployeeForm.get('email')!.value,
        contact: this.EmployeeForm.get('contact')!.value,
        gender: this.EmployeeForm.get('gender')!.value,
        skills: this.EmployeeForm.get('skills')!.value,
      };
      // Updating the data by calling service 
      this.employeeService.updateEmployee(employee)
        // Navigate to the home page
      this.router.navigate([''])
    } else {
      alert('All fields are mendatary');
    }
  }

  // Function to  add the dynmaic skill
  onAddSkillButton(event: Event): void {
    event.preventDefault();
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
        id: [{ value: UserData[0].id, disabled: true }, Validators.required],
        name: [UserData[0].name, Validators.required],
        email: [UserData[0].email, Validators.required],
        contact: [UserData[0].contact, Validators.required],
        gender: [UserData[0].gender, Validators.required],
        skills: this.fb.array(this.GetData(UserData[0].skills)),
      });
    }
  }

 
}
