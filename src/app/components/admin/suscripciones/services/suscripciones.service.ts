import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription } from '../interfaces/suscripciones.interface';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class SubscriptionsService {
  private apiURL = 'http://localhost:3000/suscripciones';
  constructor(private http: HttpClient) {}

  // GET ALL Subscription
  getSubscriptions():Observable<Subscription[]>{
    return this.http.get<Subscription[]>(this.apiURL);
  }

  // GET ONE Subscription
  getOneSubscription():Observable<Subscription[]>{
    const url = `${this.apiURL}/destacada`; // destacada
    return this.http.get<Subscription[]>(url);
  }

  // VIEW ONE Subscription
  viewSubscription(id:string):Observable<Subscription[]>{
    const url = `${this.apiURL}/${id}`; // id
    return this.http.get<Subscription[]>(url);
  }

  // CREATE ONE Subscription
  createSubscription(historia: Subscription):Observable<Subscription[]>{   
    return this.http.post<Subscription[]>(this.apiURL, historia, httpOptions);
  }

  // UPDATE Subscription
  updateSubscription(historia: Subscription, id: string):Observable<Subscription[]>{
    const url = `${this.apiURL}/${id}`; // Update api/historias/:id
    return this.http.put<Subscription[]>(url, historia, httpOptions);
  }

  // DELETE Subscription
  deleteSubscription(id: string): Observable<Subscription[]> {
    const url = `${this.apiURL}/${id}`; // DELETE api/historias/:id
    return this.http.delete<Subscription[]>(url, httpOptions);
  }

}


