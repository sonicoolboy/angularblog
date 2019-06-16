import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { MustMatch } from 'src/app/_helpers/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signupForm: FormGroup;
  submitted: boolean = false;
  loader: boolean = false;
  userInfo:any = [];
  apiValidErr: any = [];

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      c_password: ['', Validators.required]
    },
    {
      validators: MustMatch("password", "c_password")
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  onSubmit() {
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }

    this.userService.register(this.signupForm.value).subscribe((data: {}) => 
      {
        this.apiValidErr = [];
        this.userInfo = data;
        // console.log(this.userInfo);
        // console.log(this.userInfo.data.token);
        if(!this.userInfo.error){
          localStorage.setItem('ACCESS_TOKEN', this.userInfo.data.token);
          if (this.userService.isLoggedIn) {
            this.router.navigateByUrl('/dashboard');
          }
        }else{
          if(this.userInfo.statusCode == 422)
          {
            // console.log(this.userInfo.data.errors);
            Object.entries(this.userInfo.data.errors).forEach((item) => {
              this.apiValidErr.push({"field": item[0], "error": item[1][0]});
            });
            console.log(this.apiValidErr);
          }
          this.loader = false;
        }
      }
    );
  }

  submit_btn_clicked(){
    if (!this.signupForm.invalid) {
      this.loader = true;
    } 
  }

}
