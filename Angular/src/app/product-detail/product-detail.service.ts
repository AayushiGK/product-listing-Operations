import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ConfigService } from './../config.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {
  constructor(public config: ConfigService, private http: HttpClient) { }
  private setHeaders() {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
    });
    return headers;
  }

  getProduct(filter, callback, errCallback) {
    const options = {
      'headers': this.setHeaders(),
      params: new HttpParams().set('p_name', filter.id).set('p_category', filter.product)
    };
    this.http.get(this.config.Base_API + "/getProduct", options).subscribe(data => {
      callback(data);
    }, err => {
      errCallback(err);
    })
  }

  updateProduct(filter, callback, errCallback) {
    const options = {
      'headers': this.setHeaders(),
      params: new HttpParams().set('product_id', filter._id)
    };
    this.http.post(this.config.Base_API + "/updateProduct",filter, options).subscribe(data => {
      callback(data);
    }, err => {
      errCallback(err);
    })
  }

}
