import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserResponse } from '../../responses/user.response';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  userResponse?: UserResponse;
  profileForm: FormGroup;
  constructor(private router: Router, private userService: UserService, private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      retypePassword: ['', [Validators.required, Validators.minLength(8)]],
      fullName: ['', [Validators.required, Validators.pattern(/^[^\d]+$/), Validators.minLength(8)]],
      address: ['', [Validators.required]],
      dateOfBirth: [new Date(), [Validators.required]],
      isAccepted: [false, [Validators.requiredTrue]]
    }, { validators: this.checkPasswordsMatch } as AbstractControlOptions);
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
  ngOnInit(): void {
    this.userResponse = this.userService.getUserResponseFromLocalStorage()?.userResponse || this.userService.getUserResponseFromSessionStorage()?.userResponse;
    this.setDefaultValueForField();
  }
  setDefaultValueForField() {
    this.profileForm.get('phoneNumber')?.setValue(this.userResponse?.phoneNumber);
    this.profileForm.get('fullName')?.setValue(this.userResponse?.fullName);
    this.profileForm.get('address')?.setValue(this.userResponse?.address);
    this.profileForm.get('dateOfBirth')?.setValue(this.userResponse?.dateOfBirth);
  }
}
