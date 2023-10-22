import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  constructor(private readonly userService: UsersService){}

  ngOnInit(): void {
  this.initForm()
}

registerForm: FormGroup

initForm () {
  this.registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    name: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required)
  })
}

handleSubmitForm() {
  this.userService.userRegister(this.registerForm.value)
}

}
