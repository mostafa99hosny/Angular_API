import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Iproduct } from '../../models/iproduct';
import { RouterLink } from '@angular/router';
import { DynamicProductService } from '../../services/dynamic-product.service';
@Component({
  selector: 'app-table',
  imports: [CommonModule,RouterLink],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  products!:Iproduct[];

  constructor(private productsService:DynamicProductService){}

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe({
      next:(response) =>{
        this.products = response;
      },
      error:(error)=>{
        console.log(error);
        
      }
    });
  }
  deleteHandler(productId:string){
  this.productsService.deleteProduct(productId).subscribe({
    next:(response )=>{
      this.products = this.products.filter((product)=>product.id!=productId)
    }
  })
    
  }

}
