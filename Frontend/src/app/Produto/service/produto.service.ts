import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../models/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  url =  'http://localhost:5000/api/produto';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getAll(): Observable<Produto[]>
  {
    return this.http.get<Produto[]>(this.url);
  }

  getById(produtoId: number): Observable<Produto>
  {
    const apiUrl = `${this.url}/${produtoId}`;
    return this.http.get<Produto>(apiUrl);
  }

  saveProduct(produto: Produto): Observable<any>
  {
    return this.http.post<Produto>(this.url, produto, this.httpOptions);
  }

  updateProduct(produto: Produto): Observable<any> {
    return this.http.put<Produto>(this.url, produto, this.httpOptions);
  }

  deleteProduct(produtoId: number): Observable<any>{
     const apiUrl = `${this.url}/${produtoId}`;
     return this.http.delete<number>(apiUrl, this.httpOptions);
  }
}
