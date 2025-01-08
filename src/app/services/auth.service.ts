import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticatedFlag: boolean = false;

  constructor() { }

  // Método para registrar al usuario, guardando sus datos en localStorage
  signup(username: string, password: string): boolean {
    // Guardamos el nombre de usuario y contraseña en localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    return true;
  }

  // Método para iniciar sesión validando los datos del usuario guardados en localStorage
  login(username: string, password: string): boolean {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
      this.isAuthenticatedFlag = true;
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }

    return false;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedFlag || localStorage.getItem('isLoggedIn') === 'true';
  }

  logout(): void {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
  }
}