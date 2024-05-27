import { RegisterDTO } from './../dtos/user/register.dto';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpUtilService } from './http-util.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../responses/api.response';
import { LoginDTO } from '../dtos/user/login.dto';
import { UserResponse } from '../responses/user.response';
import { StorageResponse } from '../responses/storage.response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRegister = `${environment.apiBaseUrl}/users/auth/register`;
  private apiLogin = `${environment.apiBaseUrl}/users/auth/login`;
  private apiUserDetail = `${environment.apiBaseUrl}/users/auth/details`;
  private http = inject(HttpClient);
  private httpUtilService = inject(HttpUtilService);

  private apiConfig = {
    headers: this.httpUtilService.createHeaders()
  }
  constructor() { }

  register(registerDTO: RegisterDTO): Observable<ApiResponse<UserResponse>> {
    return this.http.post<ApiResponse<UserResponse>>(this.apiRegister, registerDTO, this.apiConfig);
  }

  login(loginDTO: LoginDTO): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.apiLogin, loginDTO, this.apiConfig);
  }
  getUserDetail(): Observable<ApiResponse<UserResponse>> {
    // return this.http.post<ApiResponse<UserResponse>>(this.apiUserDetail, {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`
    //   })
    // })
    return this.http.post<ApiResponse<UserResponse>>(this.apiUserDetail, this.apiConfig);
  }
  saveUserResponseToLocalStorage(userResponse?: UserResponse) {
    try {
      debugger
      if (userResponse == null || !userResponse) {
        return;
      }
      // Convert the userResponse object to a JSON string
      const userResponseJSON = JSON.stringify(userResponse);
      // Save the JSON string to local storage with a key (e.g., "userResponse")
      localStorage?.setItem('user', userResponseJSON);
      console.log('User response saved to local storage.');
    } catch (error) {
      console.error('Error saving user response to local storage:', error);
    }
  }
  getUserResponseFromLocalStorage(): StorageResponse<UserResponse> | null {
    try {
      // Retrieve the JSON string from local storage using the key
      const userResponseJSON = localStorage?.getItem('user');
      if (userResponseJSON == null || userResponseJSON == undefined) {
        return null;
      }
      // Parse the JSON string back to an object
      const userResponse = JSON.parse(userResponseJSON!);
      console.log('User response retrieved from local storage.');
      return userResponse;
    } catch (error) {
      console.error('Error retrieving user response from local storage:', error);
      return null; // Return null or handle the error as needed
    }
  }
  saveUserResponseToSessionStorage(userResponse?: UserResponse) {
    try {
      debugger
      if (userResponse == null || !userResponse) {
        return;
      }
      // Convert the userResponse object to a JSON string
      const userResponseJSON = JSON.stringify(userResponse);
      // Save the JSON string to local storage with a key (e.g., "userResponse")
      sessionStorage?.setItem('user', userResponseJSON);
      console.log('User response saved to session storage.');
    } catch (error) {
      console.error('Error saving user response to session storage:', error);
    }
  }
  getUserResponseFromSessionStorage(): StorageResponse<UserResponse> | null {
    try {
      // Retrieve the JSON string from local storage using the key
      const userResponseJSON = sessionStorage?.getItem('user');
      if (userResponseJSON == null || userResponseJSON == undefined) {
        return null;
      }
      // Parse the JSON string back to an object
      const userResponse = JSON.parse(userResponseJSON!);
      console.log('User response retrieved from local storage.');
      return userResponse;
    } catch (error) {
      console.error('Error retrieving user response from local storage:', error);
      return null; // Return null or handle the error as needed
    }
  }
  removeUserFromLocalStorage(): void {
    try {
      // Remove the user data from local storage using the key
      localStorage?.removeItem('user');
      console.log('User data removed from local storage.');
    } catch (error) {
      console.error('Error removing user data from local storage:', error);
      // Handle the error as needed
    }
  }
  removeUserFromSessionStorage(): void {
    try {
      // Remove the user data from local storage using the key
      sessionStorage?.removeItem('user');
      console.log('User data removed from local storage.');
    } catch (error) {
      console.error('Error removing user data from local storage:', error);
      // Handle the error as needed
    }
  }
}
