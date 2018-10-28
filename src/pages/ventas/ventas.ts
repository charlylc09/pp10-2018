import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
    {nombre: 'Milanesa'},
    {nombre: 'Bife'},
    {nombre: 'Empanada'},
    {nombre: 'Choripan'},
    {nombre: 'Coca Cola'},
    {nombre: 'Prity'},
    {nombre: 'Pepsi'},
    {nombre: 'Papas'},
    {nombre: 'Milanesa'},
    {nombre: 'Bife'},
    {nombre: 'Empanada'},
    {nombre: 'Choripan'},
    {nombre: 'Coca Cola'},
    {nombre: 'Yerba'}
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VentasPage');
  }

}
