import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { Categories } from '../../../../core/models/categories.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css'
})
export class PopularCategoriesComponent implements OnInit {

  categorieslest:Categories[] = []

   categoriesOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay:true,
    margin: 10,
    dots: true,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-backward-fast"></i> ', '<i class="fa-solid fa-forward-fast"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: true
  }

  private readonly categoriesService = inject(CategoriesService)
  ngOnInit(): void {
    this.getCategoriesData()
  }
  getCategoriesData():void{
    this.categoriesService.getAllcategories().subscribe({
      next:(res)=>{
        this.categorieslest = res.data 
      },
      error:(err)=>{
        console.log(err);  
      }
    })
  }

}
