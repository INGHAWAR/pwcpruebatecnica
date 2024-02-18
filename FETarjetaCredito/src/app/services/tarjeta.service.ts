import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TarjetaService {

  private myAppUrl = 'http://localhost:5280/';
  private myApiUrl = 'api/tarjeta/';
  private myURLCom = 'http://localhost:5280/api/Tarjet/'
  /*https: any;*/

  constructor(private http:HttpClient) { }

  getListTarjetas(): Observable <any>{
    return this.http.get(this.myURLCom)
  }

  deleteTarjeta (id: number): Observable<any>{
    return this.http.delete(this.myURLCom + id)
  }

  saveTarjeta (tarjeta: any): Observable<any> {
    return this.http.post(this.myURLCom, tarjeta);
  }

  editarTarjta(id: number, tarjeta: any):Observable<any>{
    return this.http.put(this.myURLCom + id, tarjeta);
  }

}
