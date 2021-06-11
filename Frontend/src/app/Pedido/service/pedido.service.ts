import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../models/Pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  url =  'http://localhost:5000/api/pedido';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getAll(): Observable<Pedido[]>
  {
    return this.http.get<Pedido[]>(this.url);
  }

  getById(pedidoId: number): Observable<Pedido>
  {
    const apiUrl = `${this.url}/${pedidoId}`;
    return this.http.get<Pedido>(apiUrl);
  }

  saveOrder(pedido: Pedido): Observable<any>
  {
    return this.http.post<Pedido>(this.url, pedido, this.httpOptions);
  }

  updateOrder(pedido: Pedido): Observable<any> {
    return this.http.put<Pedido>(this.url, pedido, this.httpOptions);
  }

  deleteOrder(pedidoId: number): Observable<any>{
     const apiUrl = `${this.url}/${pedidoId}`;
     return this.http.delete<number>(apiUrl, this.httpOptions);
  }
}
