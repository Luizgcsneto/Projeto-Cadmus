import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../model/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url =  'http://localhost:5000/api/cliente';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getAll(): Observable<Cliente[]>
  {
    return this.http.get<Cliente[]>(this.url);
  }

  getById(clienteId: number): Observable<Cliente>
  {
    const apiUrl = `${this.url}/${clienteId}`;
    return this.http.get<Cliente>(apiUrl);
  }

  saveClient(cliente: Cliente): Observable<any>
  {
    return this.http.post<Cliente>(this.url, cliente, this.httpOptions);
  }

  updateClient(cliente: Cliente): Observable<any> {
    return this.http.put<Cliente>(this.url, cliente, this.httpOptions);
  }

  deleteClient(clienteId: number): Observable<any>{
     const apiUrl = `${this.url}/${clienteId}`;
     return this.http.delete<number>(apiUrl, this.httpOptions);
  }
}
