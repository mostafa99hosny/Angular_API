import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedCardComponent } from "../../../shared/shared-card/shared-card.component";
import { Router ,ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DynamicProductService } from '../../../services/dynamic-product.service';

@Component({
  selector: 'app-product-form',
  imports: [SharedCardComponent,ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
 
})
export class ProductFormComponent implements OnInit,OnDestroy {
  productId: any;
  constructor(private router:Router,private productService :DynamicProductService ,private activeRoute:ActivatedRoute){}
  ngOnDestroy(): void {
    console.log('ProductFormComponent destroyed');
  }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('id') || 0; 
        this.productForm.reset(); 

        if (this.productId != 0) {
          this.productService.getProductById(this.productId).subscribe((response) => {
            this.getName.setValue(response.name);
            this.getPrice.setValue(response.price.toString());
            this.getQuanntity.setValue(response.quantity.toString());
          });
        }
      },
      error: (err) => {
        console.error('Error fetching route parameters:', err);
      },
    });
  }
  productForm = new FormGroup({
    name :new FormControl('',[Validators.required,Validators.minLength(3)]),
    price :new FormControl('',[Validators.required]),
    quantity :new FormControl('',Validators.required),
  })
  get getName(){
    return this.productForm.controls['name'];
  }
  get getPrice(){
    return this.productForm.controls['price'];
  }
  get getQuanntity(){
    return this.productForm.controls['quantity'];
  }
  productHandler(e:Event){
    e.preventDefault();
    if(this.productForm.status =='VALID'){
      if(this.productId ==0){
        this.productService.addNewProduct(this.productForm.value).subscribe((response)=>{
          this.router.navigate(['/products']);
        })
      }
      else{
        this.productService.editProduct(this.productId,this.productForm.value).subscribe((response)=>{
          this.router.navigate(['/products']);
        })
      }
    }
    else{
      this.productForm.markAllAsTouched();
      
    }    
  }

  
}
