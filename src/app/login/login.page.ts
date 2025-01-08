import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    const storedUserName = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    console.log(this.username)
    console.log(this.password)
   
    // Verificar que las credenciales existen en localStorage y que los campos no están vacíos
    if (!storedUserName || !storedPassword) {
      alert('No hay ningún usuario registrado. Por favor, crea una cuenta.');
      return;
    }

    if (this.username.trim() === '' || this.password.trim() === '') {
      alert('Por favor ingresa el nombre de usuario y la contraseña.');
      return;
    }

    if (this.username === storedUserName && this.password === storedPassword) {
      sessionStorage.setItem('username', this.username);
      sessionStorage.setItem('password', this.password);
      this.router.navigate(['/tabs']);
    } else {
      alert('Credenciales incorrectas');
    }
  }

}
