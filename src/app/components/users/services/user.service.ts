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

  // GET ALL USERS
  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.apiURL);
  }
  // CREATE USER
  createUser(user: User):Observable<User[]>{   
    return this.http.post<User[]>(this.apiURL, user, httpOptions);
  }

  validateLogin(user: User):Observable<User[]>{   
    const url = `${this.apiURL}/login`;
    return this.http.post<User[]>(url, user, httpOptions);
  }

  // VIEW ONE USER
  viewUser(id:string):Observable<User[]>{
    const url = `${this.apiURL}/${id}`; // id
    return this.http.get<User[]>(url);
  }

  // UPDATE USER
  updateUser(user: User, id: string):Observable<User[]>{
    const url = `${this.apiURL}/${id}`; // Update api/user/:id
    return this.http.put<User[]>(url, user, httpOptions);
  }

  // DELETE USER
  deleteUser(id: string): Observable<User[]> {
    const url = `${this.apiURL}/${id}`; // DELETE api/users/:id
    return this.http.delete<User[]>(url, httpOptions);
  }

  
}


