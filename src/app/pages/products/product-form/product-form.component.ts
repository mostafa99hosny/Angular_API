import { Component } from '@angular/core';
import { SharedCardComponent } from "../../../shared/shared-card/shared-card.component";
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StaticProductService } from '../../../services/static-product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  imports: [SharedCardComponent,ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
 
})
export class ProductFormComponent {
  constructor(private router:Router,private productService :StaticProductService){}
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
      console.log('send request');
    }
    else{
      console.log('fix errors');
      
    }
    // e.preventDefault();
    // this.productService.addNewProduct({
    //   id:'5',
    //   name:'newProduct',
    //   price: 250,
    //   img: 'imgs4.png',
    //   quantity: 5
    // });
    // this.router.navigate(['/products']);
    console.log(this.productForm);
    
  }

  
}
