import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ArticulosProvider } from '../../providers/articulos/articulos';

@IonicPage()
@Component({
  selector: 'page-articulo',
  templateUrl: 'articulo.html',
})
export class ArticuloPage {

  articulo = {
    codigo: "",
    nombre: "",
    precio: "",
    src: ""
  };

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public articulosProvider: ArticulosProvider) {
  }

  saveArticulo(){
    this.articulosProvider.create(this.articulo)
    .then(response => {
      this.navCtrl.pop();
    })
    .catch( error => {
      console.error( error );
    })
  }

}
