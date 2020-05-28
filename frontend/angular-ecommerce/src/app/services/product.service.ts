import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {



  private baseurl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private HttpClient: HttpClient) { }

  getProductList(theCategoryId: number): Observable<Product[]> {

    //@TODO:  need to build URL based on category id
    const searchUrl = `${this.baseurl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl)

  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseurl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl)
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.HttpClient.get<GetResponseProducts>(searchUrl).pipe(map(response => response._embedded.products));
  }

  getProductCategories(): Observable<ProductCategory[]> {

    return this.HttpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    )
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
