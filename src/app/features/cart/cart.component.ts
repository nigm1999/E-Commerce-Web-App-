import { Component, inject, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { ProductData } from './interfaces/product-data.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService)

  dataObj: ProductData = {} as ProductData

  ngOnInit(): void {
    this.getLoggedUserData() 
  }

  getLoggedUserData(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.dataObj = res.data;
        console.log(res);

      }, error: (err) => {
        console.log(err);

      }
    })
  }

  removItem(id: string): void {
    this.cartService.removeSpecificCartItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this.dataObj = res.data;
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  clearAllItems(): void {
    this.cartService.clearUserCart().subscribe({
      next: (res) => {
        console.log(res);
        if (res.message === "success") {
          this.getLoggedUserData();
        }
      }, error: (err) => {
        console.log(err);
      },
    })
  }

  updeteCount(id: string, count: number): void {
    this.cartService.updateCartProductQuantity(id, count).subscribe({
      next: (res) => {
        console.log(res);
        this.dataObj = res.data;
      }, error: (err) => {
        console.log(err);
      }

    })
  }

}
