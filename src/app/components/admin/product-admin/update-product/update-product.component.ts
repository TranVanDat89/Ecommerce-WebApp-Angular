import { Component, OnInit } from '@angular/core';
import { UserResponse } from '../../../../responses/user.response';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit {
  userResponse?: UserResponse | null;
  productId?: string;
  constructor(private router: ActivatedRoute, private route: Router, private userService: UserService) { }
  ngOnInit(): void {
    this.userResponse = this.userService.getUserResponseFromLocalStorage()?.userResponse || this.userService.getUserResponseFromSessionStorage()?.userResponse;
    this.router.paramMap.subscribe(params => {
      this.productId = params.get('productId') ?? '';
    });
  }
}
