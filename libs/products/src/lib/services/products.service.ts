import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "@env/environment";
import {Product} from "../..";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiURLCategories = environment.apiURL + 'products';

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURLCategories)
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiURLCategories}/${productId}`)
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiURLCategories, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiURLCategories}/${product.id}`, product);
  }
  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLCategories}/${productId}`);
  }
}
