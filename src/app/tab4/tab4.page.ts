import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AppComponent } from '../app.component';
import { LocalNotifications } from '@capacitor/local-notifications';
import { NotificacionService } from '../notificacion/notificacion.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  
  public selectedCategories: string[] = [];
  mascotas: { nombre: string;
    tipo: string;
    edad: string;
    genero: string;
    descripcion_fisica: string;
    descripcion_personalidad: string;
    esterilizado: boolean;
    foto: string;
    region: string;
    comuna: string; }[] = [];
  fotoPerfil = localStorage.getItem('foto'); 
  userDetails: Array<{ username: string; age: string; biografia: string; category: string; foto: string;}> = [];

  constructor(private notificacion: NotificacionService, private authService: AuthService, private router: Router, private storage: Storage) {
    this.storage.create();
  }

  ionViewWillEnter() {
    this.loadUserName();
    this.loadCategories();  
    this.loadAnimals();
  }

  loadUserName() {
    const userName = localStorage.getItem('username') || 'Invitado';
    const age = localStorage.getItem('age') || '';
    const biografia = localStorage.getItem('biografia') || '';
    const fotoPerfil = localStorage.getItem('foto') || '';
    
    // Limpia el array antes de cargar nuevos datos
    this.userDetails = [{
      username: userName,
      age: age,
      biografia: biografia,
      category: this.selectedCategories.join(', '),
      foto: fotoPerfil,
    }];
    console.log(this.userDetails);  
  }
  
  loadCategories() {
    const storedCategories = localStorage.getItem('category');
    if (storedCategories) {
      this.selectedCategories = JSON.parse(storedCategories);
    }
    console.log(this.selectedCategories);  
  }

  loadAnimals(){
    this.storage.get('fotos_animales').then((mascotasGuardadas) => {
      this.mascotas = mascotasGuardadas || [];
      console.log('mascotas cargadas desde Storage:', this.mascotas);
    });
  }

  actualizarFotoPerfil(nuevaFoto: string) {
    this.fotoPerfil = nuevaFoto;
    localStorage.setItem('foto', this.fotoPerfil);
  }

  guardarAnimal(datos: { nombre: string, tipo: string, edad: string, genero: string, descripcion_fisica: string, descripcion_personalidad: string, esterilizado: boolean, foto: string, region: string, comuna: string }) {
    this.mascotas.push(datos);
    this.storage.set('fotos_animales', this.mascotas);
    console.log('foto guardada en Storage:', this.mascotas);
  }
  

  // Eliminar una mascota del array y del localStorage
  eliminarMascota(index: number) {
    // Eliminar la mascota del array usando el índice
    this.mascotas.splice(index, 1);

    // Actualizar el localStorage
    this.storage.set('fotos_animales', this.mascotas);
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.loadUserName();
      this.loadCategories();  
      this.loadAnimals();
      event.target.complete();
    }, 1000);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
}
