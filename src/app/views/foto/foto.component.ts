import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-foto',
  templateUrl: './foto.component.html',
  styleUrls: ['./foto.component.scss'],
})
export class FotoComponent implements OnInit {
  @Output() fotoSeleccionada = new EventEmitter<string>(); // Emitir la imagen seleccionada
  imageUrl: string | undefined;

  constructor(private actionSheetController: ActionSheetController) {}

  ngOnInit() {
    Camera.requestPermissions();
  }

  async tomarFoto() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Seleccionar origen',
      buttons: [
        {
          text: 'Cámara',
          handler: () => {
            this.capturaFoto(CameraSource.Camera);
          },
        },
        {
          text: 'Galería',
          handler: () => {
            this.capturaFoto(CameraSource.Photos);
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  async capturaFoto(source: CameraSource) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: source,
    });

    this.imageUrl = image.webPath; // URL de la imagen seleccionada
    this.fotoSeleccionada.emit(this.imageUrl); // Emitir la URL de la imagen hacia el padre
  }
}
