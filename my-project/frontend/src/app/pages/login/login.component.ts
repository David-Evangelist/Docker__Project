import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  dados = { email: '', cpf: '' };
  mensagem = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http
      .post<{ mensagem?: string }>(`${environment.apiUrl}/login`, this.dados)
      .subscribe({
        next: () => {
          localStorage.setItem('email', this.dados.email);
          localStorage.setItem('cpf', this.dados.cpf);

          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.mensagem = err.error?.mensagem || 'Credenciais inválidas.';
        },
      });
  }
}
