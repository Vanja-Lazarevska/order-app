import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users/users.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly usersService: UsersService, 
    private readonly router: Router
    ){
  }

  isTokenExpired() {
    const token = localStorage.getItem('user')
    
    if(!token){
      return
    }
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const expiry = JSON.parse(jsonPayload).exp;
    return expiry * 1000 > Date.now();

  }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
   
   if (this.isTokenExpired()) {
    console.log('NOT Expired')
        return true

    // call logout method/dispatch logout event
  } else {
    console.log('Expired')
    this.router.navigate(['/auth/login'], {queryParams: {returnUrl: state.url}})
    this.usersService.userLogout()
    return false 
    // token is valid: send requests...
  }




  }

}