import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoriesService, Category, Product, ProductsService} from "@eastblue/products";
import {timer} from "rxjs";
import {MessageService} from "primeng/api";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html'
})
export class ProductsFormComponent implements OnInit {

  editMode = false;
  form: FormGroup;
  isSubmitted = false;
  categories: Category[]= [];
  imageDisplay: string | ArrayBuffer;
  currentProductID: string;

  constructor(private formBuilder: FormBuilder,
              private categoriesService: CategoriesService,
              private productsService: ProductsService,
              private messageService: MessageService,
              private location: Location,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
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
      image: ['', Validators.required],
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
    if(this.editMode) {
      this._updateProduct(productFormData);
    }else{
      this._addProduct(productFormData);
    }
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

  private _updateProduct(productData: FormData){
    this.productsService.updateProduct(productData, this.currentProductID).subscribe(
      (product: Product) => {
        this.messageService.add({
          severity:'success',
          summary:'Success',
          detail:`Product ${product.name} is updated!`
        });
        // Al crear una producte torna a la llista automaticament.
        timer(2000).toPromise().then(() => {
          this.location.back();
        })
      },
      () => {
        this.messageService.add({
          severity:'error',
          summary:'Error',
          detail:'Product cannot be updated!'
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
        this.imageDisplay = fileReader.result as string;
      }
      fileReader.readAsDataURL(file);
    }
  }

  private _checkEditMode() {
    this.route.params.subscribe(params => {
      if(params.id) {
        this.editMode = true;
        this.currentProductID = params.id;
        this.productsService.getProduct(params.id).subscribe(product => {
          this.productForm.name.setValue(product.name);
          this.productForm.category.setValue(product.category!.id);
          this.productForm.brand.setValue(product.brand);
          this.productForm.price.setValue(product.price);
          this.productForm.countInStock.setValue(product.countInStock);
          this.productForm.isFeatured.setValue(product.isFeatured);
          this.productForm.description.setValue(product.description);
          this.productForm.richDescription.setValue(product.richDescription);
          this.imageDisplay = product.image as string;
          //Desactivatem el validator al editar un producte. Al crear si estarà la validació.
          this.productForm.image.setValidators([]);
          this.productForm.image.updateValueAndValidity();
        });
      }
    });
  }

  onCancel(){}

}
