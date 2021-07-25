import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Historias } from '../interfaces/historias.interfaces';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class HistoriasService {
  private apiURL = 'http://localhost:3000/historias';
  constructor(private http: HttpClient) {}

  // GET ALL HISTORYS
  getHistorias():Observable<Historias[]>{
    return this.http.get<Historias[]>(this.apiURL);
  }

  // GET ONE HISTORY
  getOneHistorias():Observable<Historias[]>{
    const url = `${this.apiURL}/destacada`; // destacada
    return this.http.get<Historias[]>(url);
  }

  // VIEW ONE HISTORYS
  viewHistorias(id:string):Observable<Historias[]>{
    const url = `${this.apiURL}/${id}`; // id
    return this.http.get<Historias[]>(url);
  }

  // CREATE ONE HISTORY
  createHistorias(historia: Historias):Observable<Historias[]>{   
    return this.http.post<Historias[]>(this.apiURL, historia, httpOptions);
  }

  // UPDATE HISTORY
  updateHistoria(historia: Historias, id: string):Observable<Historias[]>{
    const url = `${this.apiURL}/${id}`; // Update api/historias/:id
    return this.http.put<Historias[]>(url, historia, httpOptions);
  }

  // DELETE HISTORY
  deleteHistoria(id: string): Observable<Historias[]> {
    const url = `${this.apiURL}/${id}`; // DELETE api/historias/:id
    return this.http.delete<Historias[]>(url, httpOptions);
  }

}


