import { Component, inject } from '@angular/core';
import { Product } from '../../core/models/product.interface';
import { ProductsService } from '../../core/services/porducts/products.service';
import { CardComponent } from "../../shared/components/card/card.component";
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-products',
  imports: [CardComponent ,NgxPaginationModule ,SearchPipe ,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export default class ProductsComponent {
  allProuduct: Product[] = []
  private readonly productsService = inject(ProductsService);

  text:string = ""
  pageSize!:number
  p!:number
  total!:number

  ngOnInit(): void {
    this.getProductData()
  }

  
  getProductData(pageNumber:number = 1 ): void {
    this.productsService.getAllProduct(pageNumber).subscribe({
      next: (res) => {
        this.allProuduct = res.data;

        this.pageSize = res.metadata.limit;
        this.p = res.metadata.currentPage;
        this.total = res.results;

      }, error: (err) => {
        console.log(err);
      }
      
    }
    )
  }

}
