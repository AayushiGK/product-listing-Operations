import { ConfigService } from '../config.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  constructor(private config: ConfigService, private http: HttpClient) { }
  private setHeaders() {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
    });
    return headers;
  }

  getCategories(callback, errCallback) {
    this.http.get(this.config.Base_API + "/getCategories").subscribe(data => {
      callback(data);
    }, err => {
      errCallback(err)
    })
  }

  addProduct(filter, callback, errCallback) {
    const options = {
      'headers': this.setHeaders()
    };
    this.http.post(this.config.Base_API + "/addProduct",filter, options).subscribe(data => {
      callback(data);
    }, err => {
      errCallback(err);
    })
  }
}
