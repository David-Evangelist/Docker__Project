// src/app/usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Usuario {
  nome: string;
  email: string;
  cpf: string;
  _id?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  cadastrar(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.apiUrl}/cadastrar`, usuario);
  }

  listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`);
  }

  remover(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/usuarios/${id}`);
  }
}
