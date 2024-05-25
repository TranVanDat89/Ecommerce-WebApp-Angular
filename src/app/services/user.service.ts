import { RegisterDTO } from './../dtos/user/register.dto';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpUtilService } from './http-util.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../responses/api.response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRegister = `${environment.apiBaseUrl}/users/auth/register`;
  private http = inject(HttpClient);
  private httpUtilService = inject(HttpUtilService);

  private apiConfig = {
    headers: this.httpUtilService.createHeaders()
  }
  constructor() { }

  register(registerDTO: RegisterDTO): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiRegister, registerDTO, this.apiConfig);
  }
}
