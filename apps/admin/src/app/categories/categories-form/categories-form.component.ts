import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoriesService, Category} from "@eastblue/products";
import {MessageService} from "primeng/api";
import {timer} from "rxjs";
import { Location} from "@angular/common";

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html'
})
export class CategoriesFormComponent implements OnInit {

  form: FormGroup;
  isSubmited: boolean = false;

  constructor(private messageService: MessageService,
              private formBuilder: FormBuilder,
              private categoriesService: CategoriesService,
              private location: Location) { }

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
    const category: Category = {
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value
    }
    this.categoriesService.createCategory(category).subscribe(response => {
      this.messageService.add({
        severity:'success',
        summary:'Success',
        detail:'Category is created!'
      });
      // Al crear una category torna a la llista automaticament.
      timer(2000).toPromise().then(done => {
        this.location.back();
      })
    },
  (error) => {
        this.messageService.add({
          severity:'error',
          summary:'Error',
          detail:'Category cannot be created!'
        });
      });
  }

  get categoryForm() {
    return this.form.controls;
  }

}
