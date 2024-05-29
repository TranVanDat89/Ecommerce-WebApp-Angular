import { Component, OnInit } from '@angular/core';
import { UserResponse } from '../../../responses/user.response';
import { UserService } from '../../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../../../responses/api.response';
import { StorageResponse } from '../../../responses/storage.response';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  users?: UserResponse[];
  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.getAllUsers();
  }
  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (apiResponse: ApiResponse<StorageResponse<UserResponse[]>>) => {
        this.users = apiResponse.data.userResponses
        console.log(this.users);

      },
      error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? 'An error occurred during registration');
      }
    })
  }
}
