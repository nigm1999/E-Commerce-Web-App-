import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from './services/product-details.service';
import { Product } from '../../core/models/product.interface';


import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { flush } from '@angular/core/testing';
import { CartService } from '../cart/services/cart.service';


@Component({
  selector: 'app-details',
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  // =======================================
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayHoverPause: true,
    navSpeed: 700,
    items: 1,
    nav: false
  }
  // =======================================
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productDetailsService = inject(ProductDetailsService)
  private readonly cartService = inject(CartService);

  idParams: string | null = null;
  productDetails: Product = {} as Product;

  ngOnInit(): void {
    this.getpemter();
    this.getProductDetalisData();
  }

  getpemter(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (idUrl) => {
        this.idParams = idUrl.get('id');
      }
    })
  }

  getProductDetalisData(): void {
    this.productDetailsService.getProductDetalis(this.idParams).subscribe({
      next: (res) => {
        this.productDetails = res.data;
        // console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  
    addProductItemToCart(id:string):void{
      this.cartService.addProductToCart(id).subscribe({
        next:(res)=>{
          console.log(res);
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }

}
