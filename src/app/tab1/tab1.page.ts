import { AfterViewInit, Component, ElementRef, NgZone, Query, QueryList, ViewChildren } from '@angular/core';
import { DogApiService } from '../services/dog-api.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Gesture, GestureController, IonCard } from '@ionic/angular';
import { MatchService } from '../services/match.service'; 

import { Storage } from '@ionic/storage-angular';
import { Element } from 'ionicons/dist/types/stencil-public-runtime';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  mascotas: any[] = [];
  nuevas_Mascotas: { nombre: string;
    tipo: string;
    edad: string;
    genero: string;
    descripcion_fisica: string;
    descripcion_personalidad: string;
    esterilizado: boolean;
    foto: string;
    region: string;
    comuna: string; }[] = [];
  dogStoriesImageUrl: SafeUrl | undefined;
  mascotaActualIndex = 0; // Índice de la mascota actual


  constructor(
    private dogApiService: DogApiService, 
    private sanitizer: DomSanitizer,
    private matchService: MatchService,
    private storage: Storage,
    private gestureCtrl: GestureController
  ) { }



  @ViewChildren(IonCard, {read: ElementRef}) cards: QueryList<ElementRef> | undefined;
  longPressActive = false;
  
  ngAfterViewInit() {
    this.dogApiService.getRandomDogImageUrl().subscribe((response) => {
      this.mascotas = response.data;
    });
    this.loadAnimals();
    if (this.cards)this.cards.changes.subscribe(() => {
      this.useTinderSwipe(this.mascotas); // Ejecutamos el swipe una vez que las tarjetas estén disponibles
    });
  }
  

  async loadAnimals() {
    const mascotasGuardadas = await this.storage.get('fotos_animales');
    this.nuevas_Mascotas = mascotasGuardadas || [];
    console.log('Mascotas cargadas desde Storage:', this.nuevas_Mascotas);
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.loadAnimals();
      event.target.complete();
    }, 1000);
  }

  hacerMatch(mascota: any) {
    const usuario = localStorage.getItem('username');
    if (usuario) {
      console.log("Usuario:", usuario); 
      console.log("Mascota:", mascota); 
      this.matchService.crearMatch(usuario, mascota);
    }
    this.mostrarSiguienteMascota(); 
  }

  noMatch(mascota: any) {
    console.log('No match con la mascota:', mascota);
    this.mostrarSiguienteMascota(); 
  }

  mostrarSiguienteMascota() {
    this.mascotaActualIndex = (this.mascotaActualIndex + 1) % this.mascotas.length;
  }


  useTinderSwipe(mascotas: any) {
    // Verificamos que `this.cards` no esté undefined
    if (this.cards) {
      this.cards.toArray().forEach((card, index) => {
        const gesture: Gesture = this.gestureCtrl.create({
          el: card.nativeElement,
          threshold: 15,
          gestureName: 'swipe',
          onMove: ev => {
            card.nativeElement.style.transform = `translateX(${ev.deltaX}px) rotate(${ev.deltaX / 10}deg)`;
  
            // Cambiar el gradiente de la tarjeta si se mueve más de 150px a la derecha
            if (ev.deltaX > 150) {
              card.nativeElement.style.backgroundColor = '#00FF00'; // color verde
              // Cambiar el gradiente en .mascota-info (color verde)
              const mascotaInfo = card.nativeElement.querySelector('.mascota-info');
              if (mascotaInfo) {
                mascotaInfo.style.background = 'linear-gradient(to bottom, rgba(0, 255, 0, 0.1), rgba(0, 255, 0, 0.5))';
              }
            } 
            // Cambiar el gradiente de la tarjeta si se mueve más de 150px a la izquierda
            else if (ev.deltaX < -150) {
              card.nativeElement.style.backgroundColor = '#FF0000'; // color rojo
              // Cambiar el gradiente en .mascota-info (color rojo)
              const mascotaInfo = card.nativeElement.querySelector('.mascota-info');
              if (mascotaInfo) {
                mascotaInfo.style.background = 'linear-gradient(to bottom, rgba(255, 0, 0, 0.1), rgba(255, 0, 0, 0.5))';
              }
            } else {
              // Restablecer el color de fondo original y gradiente si no se alcanza el umbral
              card.nativeElement.style.backgroundColor = ''; // color original
              const mascotaInfo = card.nativeElement.querySelector('.mascota-info');
              if (mascotaInfo) {
                mascotaInfo.style.background = 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.5))';
              }
            }
          },
          onEnd: ev => {
            card.nativeElement.style.transition = '0.5s ease-out';
  
            // Si el movimiento fue mayor que 150px, hacemos el match
            if (ev.deltaX > 150) {
              this.hacerMatch(mascotas);
              card.nativeElement.style.transform = ''; // Limpiar el transform después de hacer el match
              card.nativeElement.style.backgroundColor = ''; // Restablecer el color de fondo
              const mascotaInfo = card.nativeElement.querySelector('.mascota-info');
              if (mascotaInfo) {
                mascotaInfo.style.background = 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.5))'; // Restaurar el gradiente original
              }
            } 
            // Si el movimiento fue menor que -150px, no hacemos match
            else if (ev.deltaX < -150) {
              this.noMatch(mascotas);
              card.nativeElement.style.transform = ''; // Limpiar el transform después de no hacer el match
              card.nativeElement.style.transition = '0.5s ease-out'; // Rápido si no hay match
              card.nativeElement.style.backgroundColor = ''; // Restablecer el color de fondo
              const mascotaInfo = card.nativeElement.querySelector('.mascota-info');
              if (mascotaInfo) {
                mascotaInfo.style.background = 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.5))'; // Restaurar el gradiente original
              }
            } else {
              card.nativeElement.style.transform = ''; // Limpiar el transform si no se cumple ninguna condición
              card.nativeElement.style.backgroundColor = ''; // Restablecer el color de fondo
              const mascotaInfo = card.nativeElement.querySelector('.mascota-info');
              if (mascotaInfo) {
                mascotaInfo.style.background = 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.5))'; // Restaurar el gradiente original
              }
            }
          }
        }, true);
        gesture.enable(true);
      });
    }
  }
  
  


}