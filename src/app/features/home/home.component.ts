import { Component, inject, OnInit } from '@angular/core';
import { MainSliderComponent } from "./components/main-slider/main-slider.component";
import { PopularCategoriesComponent } from "./components/popular-categories/popular-categories.component";
import PopularPorductComponent from './components/popular-porduct/popular-porduct.component';
@Component({
  selector: 'app-home',
  imports: [MainSliderComponent, PopularCategoriesComponent ,PopularPorductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {
    
}
