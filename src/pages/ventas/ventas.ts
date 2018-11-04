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

  public comprobante = {
    numero: 0,
    puntoDeVenta: 1,
    fechaEmision: new Date(),
    total: 60
  };

  articulos: any[] = [];

  /*public articulos = [
    {nombre: 'Milanesa', precio: 25.00, src: 'https://http2.mlstatic.com/milanesas-de-pollo-D_NQ_NP_979460-MLA27152434356_042018-F.jpg'},
    {nombre: 'Bife', precio: 25.00, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwSqvONBEvMWiKqOHFSItGtoG51WsyyLzKMl8D4Egeimj9C9si'},
    {nombre: 'Empanada', precio: 25.00, src: 'http://www.recetasjudias.com/wp-content/uploads/2017/06/Burekas-Empanadas-de-Berenjenas-y-Queso.jpg'},
    {nombre: 'Choripan', precio: 25.00, src: 'https://www.eternacadencia.com.ar/components/com_virtuemart/assets/images/vmgeneral/no-image.jpg'},
    {nombre: 'Coca Cola', precio: 25.00, src: 'https://www.eternacadencia.com.ar/components/com_virtuemart/assets/images/vmgeneral/no-image.jpg'},
    {nombre: 'Pritty', precio: 25.00, src: 'https://www.eternacadencia.com.ar/components/com_virtuemart/assets/images/vmgeneral/no-image.jpg'},
    {nombre: 'Pepsi', precio: 25.00, src: 'https://www.eternacadencia.com.ar/components/com_virtuemart/assets/images/vmgeneral/no-image.jpg'},
    {nombre: 'Papas', precio: 25.00, src: 'https://www.eternacadencia.com.ar/components/com_virtuemart/assets/images/vmgeneral/no-image.jpg'},
    {nombre: 'Milanesa', precio: 25.00, src: 'https://www.eternacadencia.com.ar/components/com_virtuemart/assets/images/vmgeneral/no-image.jpg'},
    {nombre: 'Bife', precio: 25.00, src: 'https://www.eternacadencia.com.ar/components/com_virtuemart/assets/images/vmgeneral/no-image.jpg'},
    {nombre: 'Empanada', precio: 25.00, src: 'https://www.eternacadencia.com.ar/components/com_virtuemart/assets/images/vmgeneral/no-image.jpg'},
    {nombre: 'Choripan', precio: 25.00, src: 'https://www.eternacadencia.com.ar/components/com_virtuemart/assets/images/vmgeneral/no-image.jpg'},
    {nombre: 'Coca Cola', precio: 25.00, src: 'https://www.eternacadencia.com.ar/components/com_virtuemart/assets/images/vmgeneral/no-image.jpg'},
    {nombre: 'Yerba', precio: 25.00, src: 'https://www.eternacadencia.com.ar/components/com_virtuemart/assets/images/vmgeneral/no-image.jpg'}
  ];*/

  public items = [
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

  segmentosArticulos: string = "todos";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public popoverCtrl: PopoverController,
              public articulosProvider: ArticulosProvider) {

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
    this.items.unshift({
        nombre: articulo.nombre,
        cantidad: 1,
        importe: articulo.precio,
        total: articulo.precio
    });

    this.calcularTotales();
  }

  calcularTotales(){
    let tmpTotal: number = 0;
    for(let i=0; i<this.items.length; i++){
      tmpTotal += this.items[i].total;
    }
    this.comprobante.total = tmpTotal;
  }

}
