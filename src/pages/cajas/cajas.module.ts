import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CajasPage } from './cajas';

@NgModule({
  declarations: [
    CajasPage,
  ],
  imports: [
    IonicPageModule.forChild(CajasPage),
  ],
})
export class CajasPageModule {}
