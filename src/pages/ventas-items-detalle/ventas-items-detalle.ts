import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemsProvider } from '../../providers/items/items';

@IonicPage()
@Component({
  selector: 'page-ventas-items-detalle',
  templateUrl: 'ventas-items-detalle.html',
})
export class VentasItemsDetallePage {

  item: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public itemsProvider: ItemsProvider) {

                this.item = this.itemsProvider.items[this.navParams.get('index')];

  }

  onInputChange(event) {
    this.item.total = parseFloat(this.item.cantidad) * parseFloat(this.item.importe);
  }

  saveItem(){
    this.itemsProvider.items[this.navParams.get('index')] = this.item;
    this.navCtrl.pop();
  }

}
