import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:17101/usuarios'; // Cambia el puerto si es necesario

  constructor(private http: HttpClient) { }

  getUsuarios() {
    return this.http.get<any[]>(this.apiUrl);
  }
}
