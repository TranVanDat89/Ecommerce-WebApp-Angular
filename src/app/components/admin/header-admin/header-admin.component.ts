import { Component, HostListener, OnInit } from '@angular/core';
import { UserResponse } from '../../../responses/user.response';
import { UserService } from '../../../services/user.service';
import { Notification } from '../../../models/notification';
import { StorageResponse } from '../../../responses/storage.response';
import { ApiResponse } from '../../../responses/api.response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.css'
})
export class HeaderAdminComponent implements OnInit {
  notifications?: Notification[];
  isCollapsed: boolean = true;
  isActived: number = 0;
  userResponse?: UserResponse | null;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userResponse = this.userService.getUserResponseFromLocalStorage()?.userResponse || this.userService.getUserResponseFromSessionStorage()?.userResponse;
    this.getAllNotifications();
  }
  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  enableActived(index: number): void {
    this.isActived = index;
  }
  getAllNotifications() {
    this.userService.getAllNotifications().subscribe({
      next: (apiResponse: ApiResponse<StorageResponse<Notification[]>>) => {
        console.log(apiResponse.data);
        this.notifications = apiResponse.data.notifications
        console.log(this.notifications?.length);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? '');
      }
    })
  }
}
