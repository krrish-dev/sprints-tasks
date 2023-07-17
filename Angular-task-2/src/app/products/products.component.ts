import { Component } from '@angular/core';
import { Product } from './models/productModel'
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
   products: Product[] = [
    new Product("Nikon Camera", "../../../assets/product-1.jpg", 2000, true),
    new Product("Blue T-Shirt", "../../../assets/product-2.jpg", 250, true),
    new Product("White Lamp", "../../../assets/product-3.jpg", 500, true),
    new Product("Black Nike", "../../../assets/product-4.jpg", 300, false),
    new Product("Drone", "../../../assets/product-5.jpg", 3000, false),
    new Product("Huawei Watch", "../../../assets/product-6.jpg", 950, false),
    new Product("Black Blouse", "../../../assets/product-7.jpg", 80, true),
    new Product("Some Creams", "../../../assets/product-8.jpg", 80, false)
  ];
  featured: number;
  availableCount: number;
  all: number;
  filter = "All";
  constructor(){
    this.featured = 0;
    this.availableCount = 0;
    this.all = this.products.length;
    this.setCounts();
  }
  // getProducts(): Product[] {
  //   return this.products;
  // }
  private setCounts():void{
    this.products.forEach((product)=>{
      if(product.isFeatured) this.featured++;
      if(product.isAvailable) this.availableCount++;

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
