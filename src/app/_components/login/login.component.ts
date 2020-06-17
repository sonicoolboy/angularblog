import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  // loader: boolean = false;
  userInfo:any = [];

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder, public app: AppComponent ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    // return;
    this.userService.login(this.loginForm.value).subscribe(
      (data: {}) => 
        {
            if(data === undefined) {
                this.app.loader = false;
                return false;
            }
            this.userInfo = data;
            if(this.userInfo.status == false) {              
              // alert('invalid login details');
              this.app.loader = false;
              return;
            }
            
            
            // console.log(this.userInfo.data.token);
            if(this.userInfo.errors.length == 0){
              console.log(this.userInfo);
                localStorage.setItem('ACCESS_TOKEN', this.userInfo.data.token);
                localStorage.setItem('user_info', JSON.stringify(this.userInfo.data));
                if (this.userService.isLoggedIn) {
                    this.router.navigateByUrl('/dashboard');
                }
            }else{
                this.app.loader = false;
            }
      }     
    );
  }

  submit_btn_clicked(){
    if (!this.loginForm.invalid) {
      this.app.loader = true;
    } 
  }



}
