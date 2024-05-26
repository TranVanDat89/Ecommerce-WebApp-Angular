import { RegisterDTO } from './../dtos/user/register.dto';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpUtilService } from './http-util.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../responses/api.response';
import { LoginDTO } from '../dtos/user/login.dto';
import { UserResponse } from '../responses/user.response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRegister = `${environment.apiBaseUrl}/users/auth/register`;
  private apiLogin = `${environment.apiBaseUrl}/users/auth/login`;
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
}
