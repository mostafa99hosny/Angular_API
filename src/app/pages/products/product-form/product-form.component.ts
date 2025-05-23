import { Component } from '@angular/core';
import { SharedCardComponent } from "../../../shared/shared-card/shared-card.component";
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DynamicProductService } from '../../../services/dynamic-product.service';

@Component({
  selector: 'app-product-form',
  imports: [SharedCardComponent,ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
 
})
export class ProductFormComponent {
  constructor(private router:Router,private productService :DynamicProductService){}
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
    if(this.productForm.status =='VALID'){
      this.productService.addNewProduct(this.productForm.value).subscribe({
        next:()=>{
          this.router.navigate(['/products']);
        }
      })
    }
    else{
      console.log('fix validation of forms');
      
    }    
  }

  
}
