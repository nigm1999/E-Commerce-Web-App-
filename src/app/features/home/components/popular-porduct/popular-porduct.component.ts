import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../../../core/models/product.interface';
import { ProductsService } from '../../../../core/services/porducts/products.service';
import { CardComponent } from "../../../../shared/components/card/card.component";

@Component({
  selector: 'app-popular-porduct',
  imports: [CardComponent],
  templateUrl: './popular-porduct.component.html',
  styleUrl: './popular-porduct.component.css'
})
export default class PopularPorductComponent implements OnInit {
  allProuduct: Product[] = []
  private readonly productsService = inject(ProductsService);
  ngOnInit(): void {
    this.getProductData()
  }

  getProductData(): void {
    this.productsService.getAllProduct().subscribe({
      next: (res) => {
        this.allProuduct = res.data;
      }, error: (err) => {
        console.log(err);

      }
    }
    )
  }
}
