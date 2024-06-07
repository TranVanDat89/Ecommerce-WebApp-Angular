import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserResponse } from '../../../responses/user.response';
import { UserService } from '../../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../../../responses/api.response';
import { StorageResponse } from '../../../responses/storage.response';
import DataTables, { Config } from 'datatables.net';
import { Subject } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit, AfterViewInit {
  users?: UserResponse[];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  dtoptions: any = {};
  dttrigger: Subject<any> = new Subject<any>();
  constructor(private userService: UserService) { }
  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
    this.getAllUsers();
    this.dtoptions = {
      pagingType: 'full_numbers',
      lengthMenu: [5, 10, 15, 20, 25, 30],
      dom: 'Blfrtip',
      buttons: [
        'copy', 'excel', 'print'
      ],
      responsive: true
    }
  }
  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (apiResponse: ApiResponse<StorageResponse<UserResponse[]>>) => {
        this.users = apiResponse.data.userResponses
        console.log(this.users);
        this.dttrigger.next(null);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? 'An error occurred during registration');
      }
    })
  }
}
