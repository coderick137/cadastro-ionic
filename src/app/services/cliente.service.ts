import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

export interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private apiUrl = 'http://localhost:3000/clientes';
  private jsonHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getClients(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getClientById(id: number): Observable<Cliente> {
    if (id === 0) {
      return of(this.initializeCliente());
    }

    return this.http.get<Cliente>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  createClient(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente, { headers: this.jsonHeader })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateClient(cliente: Cliente): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${cliente.id}`, cliente, { headers: this.jsonHeader })
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse): never {
    let errorMessage: string;

    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    }
    else {
      errorMessage = `Backend returned code ${err.status}: ${err.statusText || ''}`;
    }

    throw new Error(errorMessage);
  }

  private initializeCliente(): Cliente {
    return {
      id: 0,
      nome: '',
      cpf: '',
      email: '',
      telefone: ''
    };
  }
}
