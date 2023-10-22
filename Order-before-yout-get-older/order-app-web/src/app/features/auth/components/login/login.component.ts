import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  invalidUser: boolean
  constructor(private readonly userService: UsersService){}

    ngOnInit(): void {
      this.userService.invalidUser.subscribe(data =>  {
        this.invalidUser = data
       } )
    this.initForm()
  }

  loginForm: FormGroup

  initForm () {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })

  }

  handleSubmitForm() {
    this.userService.userLogin(this.loginForm.value)
  }
}
