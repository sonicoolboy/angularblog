import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, public app: AppComponent) { }

  userinfo: any = [];

  navUserActive: boolean = false;

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.userService.getUserInfo().subscribe(
      (res) => {
        this.userinfo = res.data;
        // console.log(this.userinfo);
      }
    );
    
  }

  logout() {
    this.app.loader = true;
    this.userService.logout().subscribe((data: {}) => {      
      localStorage.removeItem('ACCESS_TOKEN');
      this.router.navigateByUrl('/login');
      this.app.loader = false;
    });
  }

  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }

}
