import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  userinfo: any = [];
  loader: boolean = false;
  navUserActive: boolean = false;

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.userinfo = JSON.parse(localStorage.getItem('user_info'));
    // console.log(this.userinfo);
  }

  logout() {
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
