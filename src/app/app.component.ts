import { Component } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.mostrarAnimacionSplash();
  }

  async mostrarAnimacionSplash() {
    await SplashScreen.show({ showDuration: 2000, autoHide: true });
  }

}
