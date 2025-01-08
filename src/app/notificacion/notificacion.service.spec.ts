import { TestBed } from '@angular/core/testing';
import { NotificacionService } from './notificacion.service';
import { LocalNotifications } from '@capacitor/local-notifications';
import { createSpyObj } from 'jasmine-core';

describe('NotificacionService', () => {
  let service: NotificacionService;
  let localNotificationsMock: jasmine.SpyObj<typeof LocalNotifications>;

  beforeEach(() => {
    localNotificationsMock = createSpyObj('LocalNotifications', ['schedule', 'getPending', 'cancel']);
    localNotificationsMock = jasmine.createSpyObj('LocalNotifications', ['schedule', 'getPending', 'cancel']);

    TestBed.configureTestingModule({
      providers: [
        NotificacionService,
        { provide: LocalNotifications, useValue: localNotificationsMock }
      ]
    });
    service = TestBed.inject(NotificacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should schedule a notification', async () => {
    await service.LanzarNotificacion( 'Título', 'Cuerpo');
    expect(localNotificationsMock.schedule).toHaveBeenCalled();
  });

  it('should get pending notifications', async () => {
    const notificaciones = [{ id: 1, title: 'Notificación 1', body: 'Cuerpo de la notificación' }];
    localNotificationsMock.getPending.and.resolveTo({ notifications: notificaciones });

    const result: any = await service.obtenerNotificacionesProgramadas();
    expect(result).toEqual(notificaciones);
    expect(localNotificationsMock.getPending).toHaveBeenCalled();
  });

  it('should cancel a notification', async () => {
    await service.cancelarNotificacion(1);
    expect(localNotificationsMock.cancel).toHaveBeenCalledWith({ notifications: [{ id: 1 }] });
  });
});