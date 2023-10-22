import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { userRegister, UserRequestBody } from 'src/app/shared/interfaces/user.interface';
import { UsersRepositoryService } from './users-repository.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  invalidUser=  new BehaviorSubject<boolean>(false)
  userId = new Subject<number>()

  constructor(
    private readonly userRepository: UsersRepositoryService, 
    private readonly router: Router, 
    private readonly activatedRoute: ActivatedRoute
    ) {}

   userLogin = async (userRequestBody: UserRequestBody) => {
   (await this.userRepository.login(userRequestBody)).subscribe({
    next: (data) => {
    localStorage.setItem('user', data.access_token)
    this.invalidUser.next(false)
    const triedRoute = this.activatedRoute.snapshot.queryParamMap.get('returnUrl') || '/admin'
    this.router.navigate([triedRoute])
    },
    error: (error) => {
      this.invalidUser.next(true)
    }
    })

  }
  userLogout () {
    localStorage.removeItem('user')
  }

  userRegister = async (userRequestBody: userRegister) =>{
    (await this.userRepository.register(userRequestBody)).subscribe()
  }

  getUserId = (token: string | null) => {
    this.userRepository.getUserId(token).subscribe((data)=>{
      this.userId.next(data) 
    })
  }

}
