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

  public pagos: any[] = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public comprobantesProvider: ComprobantesProvider,
              public itemsProvider: ItemsProvider,
              public pagosProvider: PagosProvider) {
                
  }

  ionViewWillEnter() {
    this.inicializar();
  }

  inicializar() {
    this.pagosProvider.pagos = [];

    this.pagosProvider.pagos.push({
        idComprobante: null,
        tipoPago: 0, // Efectivo
        importe: this.comprobantesProvider.comprobante.total
    });
  }


  onActionCobrar() {
    
  }

  onActionDividir(index) {

    this.pagosProvider.pagos[index].importe = this.pagosProvider.pagos[index].importe / 2;

    this.pagosProvider.pagos.push({
        idComprobante: null,
        tipoPago: this.pagosProvider.pagos[index].tipoPago,
        importe: this.pagosProvider.pagos[index].importe
    });

  }

  onActionEliminar(index) {
    this.pagosProvider.pagos.splice(index, 1);
    this.autocompletarImportes(index-1);
  }

  autocompletarImportes(index) {

    if(this.pagosProvider.pagos.length == 1){
      this.pagosProvider.pagos[0].importe = this.comprobantesProvider.comprobante.total;
      return;
    }

    let totalPago = 0;
    for(let i=0; index >= i; i++){
      totalPago += parseFloat(this.pagosProvider.pagos[i].importe);
    }

    // Si no se trata del último registro completamos el resto
    if(index < this.pagosProvider.pagos.length-1){

      for(let j=index+1; j < this.pagosProvider.pagos.length; j++){
        this.pagosProvider.pagos[j].importe = (this.comprobantesProvider.comprobante.total - totalPago) / (this.pagosProvider.pagos.length-1 - index);
      }

    }else{ // Si no es el último registro autocompletamos valor
      this.pagosProvider.pagos[index].importe = this.comprobantesProvider.comprobante.total - (totalPago - this.pagosProvider.pagos[index].importe);
    }

  }

}
