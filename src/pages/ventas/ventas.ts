import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover';
import { ArticulosProvider } from '../../providers/articulos/articulos';


@IonicPage()
@Component({
  selector: 'page-ventas',
  templateUrl: 'ventas.html',
})
export class VentasPage {

  public comprobante: any;
  public items: any[] = [];
  public articulos: any[] = [];

  segmentosArticulos: string = "todos";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public popoverCtrl: PopoverController,
              public articulosProvider: ArticulosProvider) {

                this.getAllArticulos();
                this.inicializarComprobante();
                this.calcularTotales();
  }

  ionViewDidLoad(){
    this.getAllArticulos();
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
      ev: myEvent
    });
  }

  inicializarComprobante(){
    this.comprobante = {
      numero: 0,
      puntoDeVenta: 1,
      fechaEmision: new Date(),
      total: 60
    };

    this.items = [
      {
        nombre: 'Milanesa',
        cantidad: 2,
        importe: 12.50,
        total: 25.00
      },
      {
        nombre: 'Coca Cola',
        cantidad: 1,
        importe: 35.00,
        total: 35.00
      }
    ];
  }

  getAllArticulos(){
    this.articulosProvider.getAll()
    .then(articulos => {
      console.log(articulos);
      this.articulos = articulos;
    })
    .catch( error => {
      console.error( error );
    });
  }

  agregarArticulo(articulo) {

    let existe = false;
    for(let i=0; i<this.items.length; i++){

      if(this.items[i].idArticulo == articulo.id){
        this.items[i].cantidad = parseFloat(this.items[i].cantidad) + 1;
        this.items[i].total = parseFloat(this.items[i].cantidad) * parseFloat(this.items[i].importe);
        existe = true;
      }
    }

    if(!existe){

      this.items.unshift({
          idArticulo: articulo.id,
          nombre: articulo.nombre,
          cantidad: 1,
          importe: articulo.precio,
          total: articulo.precio
      });
    }

    this.calcularTotales();
  }

  filtrarArticulos(event: any){

    const val = event.target.value;

    if (val && val.trim() != '') {
      this.articulos = this.articulos.filter((articulo) => {
        return (articulo.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  calcularTotales(){
    let tmpTotal: number = 0;
    for(let i=0; i<this.items.length; i++){
      tmpTotal += this.items[i].total;
    }
    this.comprobante.total = tmpTotal;
  }

}
