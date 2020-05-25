import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseurl = 'http://localhost:8080/api/products?size=100';

  constructor(private HttpClient: HttpClient) { }

  getProductList(theCategoryId: number): Observable<Product[]>{

    //@TODO:  need to build URL based on category id
    
    return this.HttpClient.get<GetResponse>(this.baseurl).pipe(
      map(response => response._embedded.products)
    )
  }
}

interface GetResponse{
  _embedded: {
    products: Product[];
  }
}
