import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VentasItemsPage } from './ventas-items';

@NgModule({
  declarations: [
    VentasItemsPage,
  ],
  imports: [
    IonicPageModule.forChild(VentasItemsPage),
  ],
})
export class VentasItemsPageModule {}
