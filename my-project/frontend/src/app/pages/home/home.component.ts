import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  usuarios: any[] = [];

  email = localStorage.getItem('email');
  cpf = localStorage.getItem('cpf');

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    if (!this.email || !this.cpf) {
      this.router.navigate(['/login']);
      return;
    }

    this.http.get<any[]>(`${environment.apiUrl}/usuarios`).subscribe((data) => {
      this.usuarios = data;
    });
  }

  remover(id: string) {
    this.http.delete(`${environment.apiUrl}/usuarios/${id}`).subscribe(() => {
      this.usuarios = this.usuarios.filter((u) => u._id !== id);
    });
  }

  logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('cpf');
    this.router.navigate(['/login']);
  }
}
