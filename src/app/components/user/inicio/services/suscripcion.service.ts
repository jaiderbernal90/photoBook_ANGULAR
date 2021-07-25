import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Suscipcion } from '../interfaces/suscripcion.interface';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class suscipcionService {
  private apiURL = 'http://localhost:3000/suscripciones';
  constructor(private http: HttpClient) {}

  createSuscription(suscription: Suscipcion):Observable<Suscipcion[]>{      
    return this.http.post<Suscipcion[]>(this.apiURL, suscription, httpOptions);
  }

}


