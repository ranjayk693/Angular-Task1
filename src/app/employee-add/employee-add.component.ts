import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.scss',
})
export class EmployeeAddComponent {
  constructor(private fb: FormBuilder) {}
  EmployeeForm: FormGroup = this.fb.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', Validators.required],
    contact: ['', Validators.required],
    gender: ['', Validators.required],
    skills: this.fb.array([this.SkillData()]),
  });

  SkillData() {
    return this.fb.group({
      skill: ['', Validators.required],
      experience: ['none', Validators.required],
    });
  }

  get skills() {
    return this.EmployeeForm.get('skills') as FormArray;
  }

  onSubmitButton() {
    if (this.EmployeeForm.valid) {
      console.log('All good');
    } else {
      console.log('validation require ');
    }
  }

  onAddSkillButton() {
    console.log(this.skills.controls);
    this.skills.push(this.SkillData());
  }

  onDeleteButton(index: number) {
    this.skills.removeAt(index);
  }
}
