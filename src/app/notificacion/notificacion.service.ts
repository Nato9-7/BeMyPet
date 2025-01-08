import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root',
})
export class NotificacionService {
  username = localStorage.getItem('username');
  constructor() {}

  // Solicitar permisos para mostrar notificaciones
  async solicitarPermisos() {
    const result = await LocalNotifications.requestPermissions();
    if (result.display === 'granted') {
      console.log('Permisos de notificación concedidos.');
      return true
    } else {
      console.error('Permisos de notificación denegados.');
      return false
    }
  }

  // Programar una notificación
  async LanzarNotificacion( username: string, cuerpo: string = 'Gracias por crear una cuenta en bemypet.', fecha?: Date) {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: `¡Bienvenido, ${username}!`,
            body: cuerpo,
            id: Math.floor(Math.random() * 1000),  
            schedule: {
              at: fecha || new Date(Date.now() + 1000 * 5),
            },
            smallIcon: 'icon'
          },
        ]})
    }catch{
      console.log("error")
    }
  }

  // Obtener las notificaciones pendientes
  async obtenerNotificacionesProgramadas() {
    try {
      const notificaciones = await LocalNotifications.getPending();
      return notificaciones.notifications;
    } catch (error) {
      console.error('Error al obtener las notificaciones programadas:', error);
      return [];
    }
  }

  // Cancelar una notificación
  async cancelarNotificacion(id: number) {
    try {
      await LocalNotifications.cancel({ notifications: [{ id }] });
      console.log('Notificación cancelada correctamente.');
    } catch (error) {
      console.error('Error al cancelar la notificación:', error);
    }
  }
}
