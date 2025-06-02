import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  usuario = { nome: '', email: '', cpf: '' };
  mensagem = '';

  constructor(private http: HttpClient, private router: Router) {}

  cadastrar() {
    this.http
      .post<{ mensagem: string }>(
        `${environment.apiUrl}/register`,
        this.usuario
      )
      .subscribe({
        next: () => {
          this.mensagem = 'Cadastro realizado com sucesso!';
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.mensagem = err.error?.mensagem || 'Erro ao cadastrar usuário.';
        },
      });
  }
}
