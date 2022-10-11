import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm !: FormGroup;
  error : string = '';
  username : string = '';
  password : string = '';

  constructor(public authService : AuthService, private formBuilder : FormBuilder) {
    this.authService.setSession();
   }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username : ['', Validators.required],
      password : ['', Validators.required]
    });
  }

  login(){
    console.log(this.username);
    console.log(this.password);
    this.authService.login();
  }

  logout(){
    this.authService.logout();
  }

  showSession(){
    return this.authService.showSession();
  }

  onSubmit(){
    let username : string = this.loginForm.get('username')?.value;
    let password : string = this.loginForm.value.password;

    if(this.authService.getToken(username,password)){
      console.log(this.authService.getToken(username,password));
      this.authService.login();
      this.error = '';
      
    }else{
      this.error = 'Usuario incorrecto'
    }
    }

  
  

}
