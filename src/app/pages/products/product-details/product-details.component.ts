import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Iproduct } from '../../../models/iproduct';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DynamicProductService } from '../../../services/dynamic-product.service';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule,RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  productId:any;
  product?: Iproduct;
  constructor(private activatedRoute : ActivatedRoute, private productService : DynamicProductService){
  }
  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id') ;  
   this.productService.getProductById(this.productId).subscribe({
    next:(response)=>{
      this.product=response;
    },
   }) ;
  }
}
