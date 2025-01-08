import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
  
    const userName = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');

    // Si hay credenciales guardadas (usuario ya autenticado), redirigimos a la página principal (home)
    if (userName && password) {
      console.log('Usuario autenticado, redirigiendo a /tabs');
      this.router.navigate(['/tabs']);
      return false;
    }

    // Si NO hay credenciales guardadas, permitimos el acceso (usuario no ha iniciado sesión)
    console.log('Usuario no autenticado, permitiendo acceso');
    return true;
  }
}

