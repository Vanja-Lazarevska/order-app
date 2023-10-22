import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProductsService } from 'src/app/core/services/products/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {
  constructor(
    private readonly productsService: ProductsService, 
    private readonly router: Router, 
    private readonly routerActive:ActivatedRoute
    ){}

  editForm: FormGroup
  id:number


  ngOnInit(): void {
    this.initForm()
  }

  initForm = () => {
    this.routerActive.params.pipe(switchMap((params) => {
    this.id = params['id']
    return this.productsService.getProductById(this.id)
    })).subscribe((data)=> {
      this.editForm = new FormGroup({
        name: new FormControl(data.name),
        description: new FormControl(data.description, Validators.max(100)),
        price: new FormControl(data.price, Validators.min(1)),
        category: new FormControl({value: data.category, disabled: true}),
        imageUrl: new FormControl(data.imageUrl),
        stock: new FormControl(data.stock,  Validators.min(1)),
      })
       
    })}
  

  handleSubmit =() => {
    this.routerActive.params.subscribe((data)=> {
      this.id = data['id']
    })
    this.productsService.updateProduct(this.id, this.editForm.getRawValue())
    this.editForm.reset()
    this.router.navigate(['/admin'])  
  }
}
