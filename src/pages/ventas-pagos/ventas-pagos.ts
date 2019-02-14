import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComprobantesProvider } from '../../providers/comprobantes/comprobantes';
import { ItemsProvider } from '../../providers/items/items';
import { PagosProvider } from '../../providers/pagos/pagos';


@IonicPage()
@Component({
  selector: 'page-ventas-pagos',
  templateUrl: 'ventas-pagos.html',
})
export class VentasPagosPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public comprobantesProvider: ComprobantesProvider,
              public itemsProvider: ItemsProvider,
              public pagosProvider: PagosProvider) {

  }


  onActionCobrar(){
    
  }
}
