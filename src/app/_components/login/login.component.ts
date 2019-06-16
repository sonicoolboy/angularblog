import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  loader: boolean = false;
  userInfo:any = [];

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder ) { }

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
        this.userInfo = data;
        // console.log(this.userInfo);
        // console.log(this.userInfo.data.token);
        if(!this.userInfo.error){
          localStorage.setItem('ACCESS_TOKEN', this.userInfo.data.token);
          if (this.userService.isLoggedIn) {
            this.router.navigateByUrl('/dashboard');
          }
        }else{
          this.loader = false;
        }
      }     
    );
  }

  submit_btn_clicked(){
    if (!this.loginForm.invalid) {
      this.loader = true;
    } 
  }



}
