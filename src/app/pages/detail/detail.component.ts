import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/products.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { ErrorComponent } from '../../components/error/error.component';
import { CapitalizePipe } from 'src/app/pipes/capitalize.pipe';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    ErrorComponent,
    RouterModule,
    CapitalizePipe,
  ],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  product: any;
  isLoading = true;
  isError = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isLoading = true;
        this.isError = false;
        this.productService.getProductById(id).subscribe({
          next: (response) => {
            this.product = response;
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Failed to load product details:', err);
            this.isLoading = false;
            this.isError = true;
          },
        });
      }
    });
  }
}
