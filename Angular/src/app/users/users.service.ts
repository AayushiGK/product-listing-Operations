import { ConfigService } from '../config.service';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private config: ConfigService, private http: HttpClient) { }
  private setHeaders() {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
    });
    return headers;
  }

  getUsers(callback, errCallback) {
    const options = { 'headers': this.setHeaders() };
    this.http.get(this.config.Base_API + "/getUsers", options).subscribe(data => {
      callback(data);
    }, err => {
      errCallback(err)
    })
  }

  getSingleUser(email, callback, errCallback) {
    const options = {
      'headers': this.setHeaders(),
      params: new HttpParams().set("email", email)
    };
    this.http.get(this.config.Base_API + "/getSingleUser", options).subscribe(data => {
      callback(data);
    }, err => {
      errCallback(err)
    })
  }

  addEditUser(isNew, user, callback, errCallback) {
    const options = {
      'headers': this.setHeaders(),
      params: new HttpParams().set('isNew', isNew)
    };
    this.http.post(this.config.Base_API + "/addEditUser", user, options).subscribe(data => {
      callback(data);
    }, err => {
      errCallback(err);
    })
  }

  deleteUser(email, callback, errCallback) {
    console.log(email)
    const options = { 'headers': this.setHeaders() };
    this.http.post(this.config.Base_API + "/deleteUser", { email }, options).subscribe(data => {
      callback(data);
    }, err => {
      errCallback(err);
    })
  }

  public uploadFile(formData: FormData, callback) {
    const options = { reportProgress: true };
    const req = new HttpRequest('POST', this.config.Base_API + '/upload', formData, options);
    this.http.request(req).subscribe((data: any) => {
      console.log(data)
      if (data.body) {
        callback(false, true, data.body);
      } else {
        callback(false, false, 100 * data.loaded / data.total);
      }
    }, err => {
      callback(true, false, 0);
    });
  }
}
