import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private router: Router) { }

  crearMatch(usuario: any, mascota: any) {
    const match = { usuario: usuario, mascota: mascota };
    localStorage.setItem('match_' + mascota.id, JSON.stringify(match));
    console.log('Match creado:', match); 
    this.router.navigate(['/tabs/chats']); 
  }

  verificarMatch(mascotaId: number): boolean {
    const match = localStorage.getItem('match_' + mascotaId);
    return match ? true : false;
  }
}