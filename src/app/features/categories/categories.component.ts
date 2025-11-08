import { Component, inject } from '@angular/core';
import { Categories } from '../../core/models/categories.interface';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { FormsModule } from "@angular/forms";
import { SearchCtPipe } from './pipe/search-ct-pipe';

@Component({
  selector: 'app-categories',
  imports: [FormsModule, SearchCtPipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  private readonly categoriesService = inject(CategoriesService)

  categorieslest: Categories[] = []
  text: string = ""
  sort: string = 'name';

  formatDate(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' });
  }


  copySlug(slug: string) {
    navigator.clipboard.writeText(slug);
  }

  ngOnInit(): void {
    this.getCategoriesData()
  }

  
  getCategoriesData(): void {
    this.categoriesService.getAllcategories().subscribe({
      next: (res) => {
        this.categorieslest = res.data
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
