import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from 'src/app/components/error/error.component';
import { LoadingComponent } from 'src/app/components/loading/loading.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LoadingComponent, ErrorComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: any;
  products: any[] = [];
  isLoading = true;
  isError = false;

  // Slider properties
  sliderImages: string[] = [];
  currentIndex = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private productService: ProductService
  ) {}

  // Slider methods
  nextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.sliderImages.length;
  }

  prevImage(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.sliderImages.length) %
      this.sliderImages.length;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    const userString = localStorage.getItem('currentUser');
    if (userString) {
      this.user = JSON.parse(userString);
    }

    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response.products;
        this.sliderImages = this.products.slice(0, 5).map((p) => p.thumbnail);
        this.isLoading = false;
        this.isError = false;

        setInterval(() => this.nextImage(), 5000);
      },
      error: (err) => {
        console.error('Failed to load products:', err);
        this.isLoading = false;
        this.isError = true;
      },
    });
  }
}
