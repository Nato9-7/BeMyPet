import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'; // Importamos el AuthService
import {EncryptService} from '../services/encrypt.service';
import { NotificacionService } from '../notificacion/notificacion.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm!: FormGroup;
  age: number | null = null;

  constructor(private navCtrl: NavController, 
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private encrypt: EncryptService,
              private notificacion: NotificacionService) {} // Inyectamos el servicio de autenticación
  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      userName: ['', Validators.required],
      birthDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async signup() {
    if (this.signupForm.valid) {
      const { userName, birthDate, email, password } = this.signupForm.value;
      const age = this.calculateAge(birthDate);

      // Encriptar la contraseña
      const hashedPassword = await this.encrypt.set('123456$#@$^@1ERF',password);
      console.log('se encripto', hashedPassword);

      localStorage.setItem('username', userName);
      // Llamamos al método signup del servicio de autenticación
      this.authService.signup(userName, password);

      console.log('Formulario válido:', userName, birthDate, email, password);
      console.log('Edad:', age);
      this.LanzarNotificacion(userName);

      setTimeout(() => {
        this.navCtrl.navigateRoot('/login');
        alert('Cuenta creada exitosamente')
      }, 1000);
    } else {
      console.log('Formulario no válido');
    }
  }

  calculateAge(birthDate: string): number {
    const birth = new Date(birthDate);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    localStorage.setItem('age', age.toString());
    return age;
  }

  async LanzarNotificacion(username: string) {
    const permisos = await this.notificacion.solicitarPermisos();
    if (permisos) {
      await this.notificacion.LanzarNotificacion(username);
    } else {
      console.log("Permiso de notificación no concedido.");
    }
  }
}
