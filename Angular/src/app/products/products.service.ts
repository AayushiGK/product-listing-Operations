import { ConfigService } from './../config.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  private setHeaders() {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
    });
    return headers;
  }

  getProducts(filter, callback, errCallback) {
    const options = {
      'headers': this.setHeaders(),
      params: new HttpParams().set('filter', filter)
    };
    this.http.get(this.config.Base_API + "/getProducts", options).subscribe(data => {
      callback(data);
    }, err => {
      errCallback(err);
    })
  }

  deleteProduct(filter, callback, errCallback) {
    console.log('filter',filter)
    const options = {
      'headers': this.setHeaders(),
      params: new HttpParams().set('product_id', filter._id)
    };
    this.http.post(this.config.Base_API + "/deleteProduct",filter, options).subscribe(data => {
      callback(data);
    }, err => {
      errCallback(err);
    })
  }
}
