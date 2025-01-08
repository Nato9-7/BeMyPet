import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
  
    const userName = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');

    // Si no hay credenciales guardadas, redirigimos al login
    if (!userName || !password) {
      console.log('No hay credenciales, redirigiendo a /login');
      this.router.navigate(['/login']);
      return false;
    }
    console.log('Usuario autenticado, permitiendo acceso a la ruta');

    return true;
  }
}
