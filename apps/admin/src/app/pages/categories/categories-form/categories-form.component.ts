import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoriesService, Category} from "@eastblue/products";
import {MessageService} from "primeng/api";
import {Subject, timer} from "rxjs";
import { Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html'
})
export class CategoriesFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentCategoryID: string;
  endSubscription$: Subject<any> = new Subject();


  constructor(private messageService: MessageService,
              private formBuilder: FormBuilder,
              private categoriesService: CategoriesService,
              private location: Location,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name:['', Validators.required],
      icon:['', Validators.required],
      color:['#fff']
    });
    this._checkEditMode();
  }

  ngOnDestroy() {
    this.endSubscription$.next();
    this.endSubscription$.complete();
  }

  onSubmit() {
    this.isSubmitted = true;
    if(this.form.invalid){
      return;
    }
    const category: Category = {
      id: this.currentCategoryID,
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
      color: this.categoryForm.color.value
    };

    if(this.editMode) {
      this._updateCategory(category);
    } else {
      this._addCategory(category);
    }

  }

  private _updateCategory(category: Category) {
    this.categoriesService
      .updateCategory(category)
      .pipe(takeUntil(this.endSubscription$))
      .subscribe(
  (category: Category) => {
        this.messageService.add({
          severity:'success',
          summary:'Success',
          detail:`Category ${category.name} is updated!`
        });
        // Al crear una category torna a la llista automaticament.
        timer(2000).toPromise().then(() => {
          this.location.back();
        })
      },
  () => {
        this.messageService.add({
          severity:'error',
          summary:'Error',
          detail:'Category cannot be updated!'
        });
      }
    );
  }
  private _addCategory(category: Category) {
    this.categoriesService
      .createCategory(category)
      .pipe(takeUntil(this.endSubscription$))
      .subscribe(
  (category: Category) => {
        this.messageService.add({
          severity:'success',
          summary:'Success',
          detail:`Category ${category.name} created!`
        });
        // Al crear una category torna a la llista automaticament.
        timer(2000).toPromise().then(() => {
          this.location.back();
        })
      },
  () => {
        this.messageService.add({
          severity:'error',
          summary:'Error',
          detail:'Category cannot be created!'
        });
      }
    );
  }


  // If there is id param, is edit mode true
  private _checkEditMode() {
    this.route.params
      .pipe(takeUntil(this.endSubscription$))
      .subscribe(params => {
        if(params.id) {
          this.editMode = true;
          this.currentCategoryID = params.id;
          this.categoriesService
            .getCategory(params.id)
            .pipe(takeUntil(this.endSubscription$))
            .subscribe(category => {
              this.categoryForm.name.setValue(category.name);
              this.categoryForm.icon.setValue(category.icon);
              this.categoryForm.color.setValue(category.color);
            });
        }
    });
  }

  get categoryForm() {
    return this.form.controls;
  }

  onCancel() {
    this.location.back();
  }

}
