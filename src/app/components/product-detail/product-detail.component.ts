import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  productId: string;
  constructor(private router: ActivatedRoute) {
    this.productId = '';
  }
  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.productId = params.get('productId') ?? '';
    });
  }
}
