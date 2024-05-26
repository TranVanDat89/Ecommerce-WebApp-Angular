import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoginDTO } from '../../dtos/user/login.dto';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../../responses/api.response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private router: Router, private userService: UserService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/^\d+$/)]],
      password: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      rememberMe: [true]
    })
  }
  registerAccount() {
    this.router.navigate(["/register"]);
  }
  login() {
    if (this.loginForm.valid) {
      const loginDTO: LoginDTO = {
        phoneNumber: this.loginForm.get('phoneNumber')?.value,
        password: this.loginForm.get('password')?.value
      }
      this.userService.login(loginDTO).subscribe({
        // Field data of ApiResponse have object {token: "....."} => any for short
        next: (apiResponse: ApiResponse<any>) => {
          // console.log(apiResponse);
          // console.log(apiResponse.data.token, apiResponse.statusCode, apiResponse.timeStamp)
          const { token } = apiResponse.data;
          this.router.navigate(['/']);
        },
        error: (error: HttpErrorResponse) => {
          console.error(error?.error?.message ?? 'An error occurred during registration');
        }
      })
    }
  }
}
