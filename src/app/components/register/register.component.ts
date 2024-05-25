import { Component, ViewChild } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { RegisterDTO } from '../../dtos/user/register.dto';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../../responses/api.response';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  constructor(private router: Router, private userService: UserService, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      retypePassword: ['', [Validators.required], Validators.minLength(8)],
      fullName: ['', [Validators.required], Validators.pattern(/^[^\d]+$/), Validators.minLength(8)],
      address: ['', [Validators.required]],
      dateOfBirth: [new Date(), [Validators.required]],
      isAccepted: [false, [Validators.requiredTrue]]
    }, { validator: this.checkPasswordsMatch } as AbstractControlOptions)
  }
  checkPasswordsMatch(form: FormGroup) {
    const password = form.get('password');
    const retypePassword = form.get('retypePassword');
    if (password && retypePassword && password.value !== retypePassword.value) {
      retypePassword.setErrors({ passwordMismatch: true });
    } else {
      retypePassword?.setErrors(null);
    }
  }
  register(): void {
    if (this.registerForm.valid) {
      const registerDTO: RegisterDTO = {
        fullName: this.registerForm.get('fullName')?.value,
        phoneNumber: this.registerForm.get('phoneNumber')?.value,
        address: this.registerForm.get('address')?.value,
        password: this.registerForm.get('password')?.value,
        dateOfBirth: this.registerForm.get('dateOfBirth')?.value
      };

      this.userService.register(registerDTO).subscribe({
        next: (apiResponse: any) => {
          const confirmation = window.confirm('Đăng ký thành công, mời bạn đăng nhập. Bấm "OK" để chuyển đến trang đăng nhập.');
          if (confirmation) {
            this.router.navigate(['/login']);
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error(error?.error?.message ?? 'An error occurred during registration');
        }
      });
    }
  }
}
