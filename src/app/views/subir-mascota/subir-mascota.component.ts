import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-subir-mascota',
  templateUrl: './subir-mascota.component.html',
  styleUrls: ['./subir-mascota.component.scss'],
})
export class SubirMascotaComponent implements OnInit {
  @Output() mascotaGuardada = new EventEmitter<{
    nombre: string;
    tipo: string;
    edad: string;
    genero: string;
    descripcion_fisica: string;
    descripcion_personalidad: string;
    esterilizado: boolean;
    foto: string;
    region: string;
    comuna: string;
  }>(); // Emitir los datos de la mascota

  // Variables para el formulario
  nombre: string = '';
  tipo: string = '';
  edad: string = '';
  genero: string = '';
  descripcion_fisica: string = '';
  descripcion_personalidad: string = '';
  esterilizado: boolean = false;
  foto: string | undefined;
  region: string = '';
  comuna: string = '';
  mostrarFormulario: boolean = false;
  imageUrl: string | undefined;

  constructor(private actionSheetController: ActionSheetController) {}

  ngOnInit() {}

  abrirFormulario() {
    this.mostrarFormulario = true;
  }

  // Método para cerrar el formulario
  cerrarFormulario() {
    this.mostrarFormulario = false;
    this.nombre = '';  // Limpiar campos del formulario
    this.tipo = '';
    this.edad = '';
    this.genero = '';
    this.descripcion_fisica = '';
    this.descripcion_personalidad = '';
    this.esterilizado = false;
    this.region = '';
    this.comuna = '';
    this.imageUrl = undefined;
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
      resultType: CameraResultType.Base64, // Cambia a Base64
      source: source,
    });
  
    this.imageUrl = `data:image/jpeg;base64,${image.base64String}`; // Guarda como Base64
  }

  guardarMascota() {
    if (this.nombre && this.imageUrl) {
      // Crear el objeto con todos los campos necesarios
      const mascota = {
        nombre: this.nombre,
        tipo: this.tipo,
        edad: this.edad,
        genero: this.genero,
        descripcion_fisica: this.descripcion_fisica,
        descripcion_personalidad: this.descripcion_personalidad,
        esterilizado: this.esterilizado,
        foto: this.imageUrl,
        region: this.region,
        comuna: this.comuna,
      };

      // Guardar los datos de la mascota en localStorage
      localStorage.setItem('mascota', JSON.stringify(mascota)); // Almacena el objeto como JSON
  
      // Emitir los datos del formulario
      this.mascotaGuardada.emit(mascota);
  
      // Limpiar el formulario después de guardar
      this.cerrarFormulario();
    }
  }
}
