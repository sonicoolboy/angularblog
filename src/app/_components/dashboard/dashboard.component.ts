import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  userinfo: any = [];
  loader: boolean = false;

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.userinfo = [];
    this.userService.getUserInfo().subscribe((data: {}) => {
      // console.log(data);
      this.userinfo = data;
    });
  }

  
  
  logout() {
    this.loader = true;
    this.userService.logout().subscribe((data: {}) => {
      // console.log(data);
      localStorage.removeItem('ACCESS_TOKEN');
      this.router.navigateByUrl('/login');
    });
  }


  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }


}
