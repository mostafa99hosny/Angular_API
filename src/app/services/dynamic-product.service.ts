import { Observable } from 'rxjs';
import { Iproduct } from './../models/iproduct';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DynamicProductService {
  baseUrl:string='http://localhost:3007/products';

  constructor(private http:HttpClient) { }

  getAllProducts():Observable<Iproduct[]>{
    return this.http.get<Iproduct[]>(this.baseUrl);
  }
  getProductById(productId:string):Observable<Iproduct>{
    return this.http.get<Iproduct>(`${this.baseUrl}/${productId}`);
  }
  addNewProduct(product:any):Observable<Iproduct>{
    return this.http.post<Iproduct>(this.baseUrl,product);
  }
  editProduct(productId:string , product:any):Observable<Iproduct>{
    return this.http.put<Iproduct>(`${this.baseUrl}/${productId}`,product)
  }
  deleteProduct(productId:string ):Observable<Iproduct>{
    return this.http.delete<Iproduct>(`${this.baseUrl}/${productId}`)
  }
}
