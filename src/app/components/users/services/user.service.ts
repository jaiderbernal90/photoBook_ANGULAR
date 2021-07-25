import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class userService {
  private apiURL = 'http://localhost:3000/usuarios';
  constructor(private http: HttpClient) {}

  getHistorias():Observable<User[]>{
    return this.http.get<User[]>(this.apiURL);
  }

  createHistorias(user: User):Observable<User[]>{   
    return this.http.post<User[]>(this.apiURL, user, httpOptions);
  }

  validateLogin(user: User):Observable<User[]>{   
    const url = `${this.apiURL}/login`;
    return this.http.post<User[]>(url, user, httpOptions);
  }

  
}


