import { Component } from '@angular/core';
import { Product } from './models/productModel';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products: Product[] = [];
  featured: number;
  availableCount: number;
  all: number;
  filter = "All";

  constructor(private productsService: ProductsService) {
    this.featured = 0;
    this.availableCount = 0;
    this.all = this.products.length;
   // this.setCounts();
    this.products = this.productsService.getProducts(); // Fetch products data from the service
    this.setCounts();
  }

  private setCounts(): void {
    this.featured = 0;
    this.availableCount = 0;
    this.all = this.products.length;

    this.products.forEach((product) => {
      if (product.isFeatured) this.featured++;
      if (product.isAvailable) this.availableCount++;
    });
  }


  onFilterChanged(selectedFilter: string) {
    console.log('item', selectedFilter);
    this.filter = selectedFilter;
  }

  shouldBeViewed(product: Product): boolean {
    if (this.filter === "All") return true;
    if (this.filter === "Available" && product.isAvailable) return true;
    if (this.filter === "Featured" && product.isFeatured) return true;
    return false;
  }

  largerThan100(product: Product): boolean {
    return product.priceProduct > 100;
  }
}
