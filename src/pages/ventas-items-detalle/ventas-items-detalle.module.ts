import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VentasItemsDetallePage } from './ventas-items-detalle';

@NgModule({
  declarations: [
    VentasItemsDetallePage,
  ],
  imports: [
    IonicPageModule.forChild(VentasItemsDetallePage),
  ],
})
export class VentasItemsDetallePageModule {}
