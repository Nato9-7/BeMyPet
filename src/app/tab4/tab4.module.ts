import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab4Page } from './tab4.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { FotoComponent } from '../views/foto/foto.component';
import { SubirMascotaComponent } from '../views/subir-mascota/subir-mascota.component';

import { Tab4PageRoutingModule } from './tab4-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab4PageRoutingModule,
  ],
  declarations: [Tab4Page, FotoComponent, SubirMascotaComponent]
})
export class Tab4PageModule {}
