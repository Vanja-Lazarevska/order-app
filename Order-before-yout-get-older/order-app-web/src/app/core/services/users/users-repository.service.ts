import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userRegister, UserRequestBody } from 'src/app/shared/interfaces/user.interface';
import { Token } from './token.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersRepositoryService {
  private readonly URL = 'http://localhost:3000/users'

  constructor(private readonly httpClient: HttpClient) { }

  login = async (userRequestBody: UserRequestBody) => {
    return this.httpClient.post<Token>(`${this.URL}/login`, userRequestBody)
  }

  register = async (userCredentials: userRegister) => {
    return this.httpClient.post(`${this.URL}/register`, userCredentials)
  }

  getUserId = (token: string | null) => {
    return this.httpClient.get<number>(`${this.URL}/${token}`)
  }





  
}
