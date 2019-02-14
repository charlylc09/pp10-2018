import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VentasItemsDetallePage } from '../../pages/ventas-items-detalle/ventas-items-detalle';
import { VentasPagosPage } from '../../pages/ventas-pagos/ventas-pagos';
import { ComprobantesProvider } from '../../providers/comprobantes/comprobantes';
import { ItemsProvider } from '../../providers/items/items';
import { AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-ventas-items',
  templateUrl: 'ventas-items.html',
})
export class VentasItemsPage {

  cantArticulos: number = 0;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public comprobantesProvider: ComprobantesProvider,
              public itemsProvider: ItemsProvider) {

                this.calcularTotales();
  }

  ionViewWillEnter() {
    this.calcularTotales();
  }

  calcularTotales(){
    this.cantArticulos = this.comprobantesProvider.calcularTotales();
  }

  deletItem(index){
    this.itemsProvider.items.splice(index, 1);
    this.calcularTotales();
  }

  incrementItem(index){
    this.itemsProvider.items[index].cantidad = parseFloat(this.itemsProvider.items[index].cantidad) + 1;
    this.itemsProvider.items[index].total = parseFloat(this.itemsProvider.items[index].cantidad) * parseFloat(this.itemsProvider.items[index].importe);
    this.calcularTotales();
  }

  decrementItem(index){
    if(parseFloat(this.itemsProvider.items[index].cantidad)>1){
      this.itemsProvider.items[index].cantidad = parseFloat(this.itemsProvider.items[index].cantidad) - 1;
      this.itemsProvider.items[index].total = parseFloat(this.itemsProvider.items[index].cantidad) * parseFloat(this.itemsProvider.items[index].importe);
      this.calcularTotales();
    }
  }

  deleteAllItems(){
    let alert = this.alertCtrl.create({
      title: 'Despejar venta',
      message: '¿Confirma limpiar la lista de artículos agregados?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Despejar',
          handler: () => {
            this.itemsProvider.items = [];
            this.calcularTotales();
          }
        }
      ]
    });
    alert.present();
  }

  onActionCobrar(){
    this.navCtrl.push(VentasPagosPage);
  }

  onActionItemDetalle(index){
    this.navCtrl.push(VentasItemsDetallePage, {index: index});
  }
}
