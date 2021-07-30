import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoriesService, Category} from "@eastblue/products";

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html'
})
export class ProductsFormComponent implements OnInit {

  editMode = false;
  form: FormGroup;
  isSubmitted = false;
  categories: Category[]= [];
  imageDisplay: string | ArrayBuffer | null;

  constructor(private formBuilder: FormBuilder,
              private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: [''],
      isFeatured: [''],
    })
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  get productForm() {
    return this.form.controls;
  }


  onSubmit() {
  }
  onCancel() {
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if(file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      }
      fileReader.readAsDataURL(file);
    }
  }

}
