import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent  implements OnInit{


  constructor(
    private readonly productsService: ProductsService, 
    private readonly router: Router)
    {}

  form: FormGroup

  @Input()
  addToProduct: () => void

  ngOnInit(): void {
    this.initForm()
  }

  initForm = () => {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required, Validators.max(100)]),
      price: new FormControl('', [Validators.required, Validators.min(1)]),
      category: new FormControl('', Validators.required),
      imageUrl: new FormControl('', Validators.required),
      stock: new FormControl('', [Validators.required, Validators.min(1)]),
    })
  }

  handleSubmit =() => {
    this.productsService.addProductInDb(this.form.getRawValue())
    this.addToProduct()
    this.form.reset()
    this.router.navigate(['/admin'])  
  }

}
