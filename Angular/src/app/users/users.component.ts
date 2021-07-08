import { Router } from '@angular/router';
import { UserService } from './users.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  public p: any;
  public searchText: String;
  public modalRef: NgbModalRef;
  public form: FormGroup;
  public baseURL = this.config.Base_API + "/public/user_image/";

  public users: Users;
  public isNew: Boolean = true;
  public isUploading: boolean;
  public progress;
  public rnd: string = Math.random().toString();

  constructor(private service: UserService, public config: ConfigService, private router: Router, public modalService: NgbModal, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.getUsers();
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required, emailValidator])],
      firstName: [null, Validators.compose([Validators.required])],
      lastName: null,
      contact: [null, Validators.compose([Validators.required, Validators.minLength(10), phoneValidator])],
      isDeleted: '0'
    });
  }

  getUsers() {
    this.service.getUsers(data => {
      this.users = data.data;
    }, err => {
      console.log(err.stack)
    })
  }

  openModal(addUserModal, single_user) {
    if (single_user) {
      this.isNew = false;
      this.form.get('firstName').setValue(single_user.firstName);
      this.form.get('lastName').setValue(single_user.lastName);
      this.form.get('contact').setValue(single_user.contact);
      this.form.get('email').setValue(single_user.email);
    }
    else {
      this.form.reset();
      this.isNew = true;
    }
    this.modalRef = this.modalService.open(addUserModal);
  }

  onSubmit(value) {
    if (this.form.valid) {
      this.service.addEditUser(this.isNew, value, data => {
        console.log('success', data)
        this.getUsers();
      }, err => {
        console.log(err.stack);
        this.getUsers();
      })
    }
    this.modalRef.close();
  }

  closeModal() {
    this.modalRef.close();
  }

  deleteUser(userEmail) {
    this.service.deleteUser(userEmail, data => {
      console.log("Deleted Success");
    }, (err) => {
      console.log("Can't Delete User");
    });
    this.getUsers();
  }


  uploadImage(event, email) {
    this.isUploading = true;
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('email', email);
    formData.append('file', file, file.name);
    this.service.uploadFile(formData, (isfailed, done, data) => {
      if (isfailed) {
        this.isUploading = false;
        this.progress = 0;
      } else if (done) {
        this.rnd = Math.random().toString();
        this.isUploading = false;
        this.progress = 0;
      } else {
        this.progress = this.progress = data;
      }
    });
    window.location.reload();
  }

}

class Users {
  firstName: String;
  lastName: String;
  email: String;
  contact: Number;
  profileImage: String;
  isDeleted: Number;
}


export function emailValidator(control: FormControl): { [key: string]: any } {
  const emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  if (control.value && !emailRegexp.test(control.value)) {
    return { invalidEmail: true };
  }
}

export function phoneValidator(control: FormControl): { [key: string]: any } {
  const emailRegexp = /[0-9\+\-\ ]/;
  if (control.value && !emailRegexp.test(control.value)) {
    return { invalidPhone: true };
  }
}
