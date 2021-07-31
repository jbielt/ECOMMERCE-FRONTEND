import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoriesService, Category, Product, ProductsService} from "@eastblue/products";
import {timer} from "rxjs";
import {MessageService} from "primeng/api";
import {Location} from "@angular/common";

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
              private categoriesService: CategoriesService,
              private productsService: ProductsService,
              private messageService: MessageService,
              private location: Location) { }

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
      isFeatured: [false],
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
    this.isSubmitted = true;
    if(this.form.invalid) {
      return;
    }
    const productFormData = new FormData();
    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[key].value);
    });
    this._addProduct(productFormData);
  }

   _addProduct(productData: FormData) {
    console.log("addproduct?")
    this.productsService.createProduct(productData).subscribe(
      (product: Product) => {
        this.messageService.add({
          severity:'success',
          summary:'Success',
          detail:`Product ${product.name} created!`
        });
        timer(2000).toPromise().then(() => {
          this.location.back();
        })
      },
      () => {
        this.messageService.add({
          severity:'error',
          summary:'Error',
          detail:'Product cannot be created!'
        });
      }
    );
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if(file) {
      this.form.patchValue({image: file});
      this.form.get('image')!.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      }
      fileReader.readAsDataURL(file);
    }
  }

  onCancel(){}

}
