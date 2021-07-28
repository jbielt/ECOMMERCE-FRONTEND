import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html'
})
export class CategoriesFormComponent implements OnInit {

  form: FormGroup;
  isSubmited: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name:['', Validators.required],
      icon:['', Validators.required],
    });
  }

  onSubmit() {
    this.isSubmited = true;
    if(this.form.invalid){
      return;
    }
    console.log(this.categoryForm.name.value);
    console.log(this.categoryForm.icon.value);
  }

  get categoryForm() {
    return this.form.controls;
  }

}
