import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/app/config.service';
import { UserService } from '../users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public userEmail;
  public user;
  public baseURL = this.config.Base_API + "/public/user_image/";

  constructor(public route: ActivatedRoute, public service: UserService, public config:ConfigService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userEmail = params.email;
      this.getSingleUser(this.userEmail);
    })
  }

  getSingleUser(email) {
    this.service.getSingleUser(email, data => {
      this.user = data.data;
    }, err => {
      console.log(err.stack);
    })
  }

}
