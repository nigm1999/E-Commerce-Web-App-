import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrandsService } from './services/brands.service';
import { Brand } from './models/brand.interface';

@Component({
  selector: 'app-brands',
  imports: [FormsModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService)

  brands: Brand[] = []

  ngOnInit(): void {
    this.getBrandsData()
  }

  getBrandsData(): void {
    this.brandsService.getallbrands().subscribe({
      next: (res) => {
        this.brands = res.data;
      }, error: (err) => {
        console.log(err);
      },
    })
  }

  getOneBrands(id: string): void {
    this.brandsService.getSpecificBrand(id).subscribe({
      next: (res) => {
        console.log(res);
      }, error: (err) => {
        console.log(err);
      },
    })
  }

}
