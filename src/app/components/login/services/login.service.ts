import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/login.interface';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class loginService {
  private apiURL = 'http://localhost:3000/usuarios';
  constructor(private http: HttpClient) {}

  validateLogin(user: Login):Observable<Login[]>{   
    const url = `${this.apiURL}/login`;    
    return this.http.post<Login[]>(url, user, httpOptions);
  }

}


