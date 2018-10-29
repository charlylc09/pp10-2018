import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover';

/**
 * Generated class for the VentasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ventas',
  templateUrl: 'ventas.html',
})
export class VentasPage {

  public articulos = [
    {nombre: 'Milanesa', precio: 25.00, url: 'https://http2.mlstatic.com/milanesas-de-pollo-D_NQ_NP_979460-MLA27152434356_042018-F.jpg'},
    {nombre: 'Bife', precio: 25.00, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwSqvONBEvMWiKqOHFSItGtoG51WsyyLzKMl8D4Egeimj9C9si'},
    {nombre: 'Empanada', precio: 25.00, url: 'http://www.recetasjudias.com/wp-content/uploads/2017/06/Burekas-Empanadas-de-Berenjenas-y-Queso.jpg'},
    {nombre: 'Choripan', precio: 25.00, url: 'https://www.eternacadencia.com.ar/components/com_virtuemart/assets/images/vmgeneral/no-image.jpg'},
    {nombre: 'Coca Cola', precio: 25.00, url: 'https://www.eternacadencia.com.ar/components/com_virtuemart/assets/images/vmgeneral/no-image.jpg'},
    {nombre: 'Prity', precio: 25.00, url: 'https://www.eternacadencia.com.ar/components/com_virtuemart/assets/images/vmgeneral/no-image.jpg'},
    {nombre: 'Pepsi', precio: 25.00, url: 'https://www.eternacadencia.com.ar/components/com_virtuemart/assets/images/vmgeneral/no-image.jpg'},
    {nombre: 'Papas', precio: 25.00, url: 'https://www.eternacadencia.com.ar/components/com_virtuemart/assets/images/vmgeneral/no-image.jpg'},
    {nombre: 'Milanesa', precio: 25.00, url: 'https://www.eternacadencia.com.ar/components/com_virtuemart/assets/images/vmgeneral/no-image.jpg'},
    {nombre: 'Bife', precio: 25.00, url: 'https://www.eternacadencia.com.ar/components/com_virtuemart/assets/images/vmgeneral/no-image.jpg'},
    {nombre: 'Empanada', precio: 25.00, url: 'https://www.eternacadencia.com.ar/components/com_virtuemart/assets/images/vmgeneral/no-image.jpg'},
    {nombre: 'Choripan', precio: 25.00, url: 'https://www.eternacadencia.com.ar/components/com_virtuemart/assets/images/vmgeneral/no-image.jpg'},
    {nombre: 'Coca Cola', precio: 25.00, url: 'https://www.eternacadencia.com.ar/components/com_virtuemart/assets/images/vmgeneral/no-image.jpg'},
    {nombre: 'Yerba', precio: 25.00, url: 'https://www.eternacadencia.com.ar/components/com_virtuemart/assets/images/vmgeneral/no-image.jpg'}
  ];

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
    },
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
    },
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
    },
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
    },
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
    },
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
    },
  ];

  segmentosArticulos: string = "todos";

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
      ev: myEvent
    });
  }

}
