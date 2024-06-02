import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoginDTO } from '../../dtos/user/login.dto';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../../responses/api.response';
import { TokenService } from '../../services/token.service';
import { UserResponse } from '../../responses/user.response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  userResponse?: UserResponse
  constructor(private router: Router, private userService: UserService, private fb: FormBuilder, private tokenService: TokenService) {
    this.loginForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/^\d+$/)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
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
          const { token } = apiResponse.data;
          if (this.loginForm.get('rememberMe')?.value) {
            this.tokenService.deleteCookie();
            this.tokenService.setCookie(token, 7);
            this.userService.getUserDetail().subscribe({
              next: (apiResponse2: ApiResponse<UserResponse>) => {
                this.userResponse = apiResponse2.data;
                this.userService.saveUserResponseToLocalStorage(this.userResponse);
                this.router.navigate(['/']);
              },
              complete: () => {
              },
              error: (error: HttpErrorResponse) => {
                debugger;
                console.error(error?.error?.message ?? '');
              }
            })
          } else {
            this.tokenService.removeToken();
            this.tokenService.setTokenToSessionStorage(token);
            this.userService.getUserDetail().subscribe({
              next: (apiResponse2: ApiResponse<UserResponse>) => {
                this.userResponse = apiResponse2.data;
                this.userService.saveUserResponseToSessionStorage(this.userResponse);
                this.router.navigate(['/']);
              },
              complete: () => {
              },
              error: (error: HttpErrorResponse) => {
                debugger;
                console.error(error?.error?.message ?? '');
              }
            })
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error(error?.error?.message ?? 'An error occurred during registration');
        }
      })
    }
  }
}
