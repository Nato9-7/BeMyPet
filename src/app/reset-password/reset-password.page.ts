import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  reset_passwordForm!: FormGroup;
  public userResponse: boolean = false;

  constructor(private navCtrl: NavController, private formBuilder: FormBuilder) { }

  public alertButtons = [
    {
      text: 'No',
      role: 'cancel',
      handler: () => {
        this.userResponse = false; 
        console.log('Alert canceled');
      },
    },
    {
      text: 'Si',
      role: 'confirm',
      handler: () => {
        this.userResponse = true; 
        console.log('Alert confirmed');
      },
    },
  ];

  setResult(ev: CustomEvent<any>) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }
  
  ngOnInit() {
    this.reset_passwordForm = this.formBuilder.group({
      password_1: ['', Validators.required],
      password_2: ['', Validators.required]
    });
  }


  
  reset_password(){
    if (this.reset_passwordForm.valid && localStorage.getItem('password') == this.reset_passwordForm.value.password_1 && this.userResponse) {
      alert("Contraseña cambiada correctamente");
      const { password_1, password_2 } = this.reset_passwordForm.value;
      console.log('Formulario válido:', localStorage.getItem('password'), password_2);
      localStorage.setItem('password', this.reset_passwordForm.value.password_2);
      this.navCtrl.navigateRoot('/login');
    } else {
      alert("Error al cambiar la contraseña");
      console.log('Formulario no válido', localStorage.getItem('password'));
    }
  }

}
