import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ArticulosProvider } from '../../providers/articulos/articulos';
import { ArticuloPage } from '../../pages/articulo/articulo';


@IonicPage()
@Component({
  selector: 'page-articulos',
  templateUrl: 'articulos.html',
})
export class ArticulosPage {

  articulos: any[] = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public articulosProvider: ArticulosProvider) {
  }

  ionViewDidLoad(){
    this.getAllArticulos();
  }

  ionViewWillEnter() {
    this.getAllArticulos();
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

  deletArticulo(articulo: any, index){
    this.articulosProvider.delete(articulo)
    .then(response => {
      console.log( response );
      this.articulos.splice(index, 1);
    })
    .catch( error => {
      console.error( error );
    })
  }

  addArticulo(){
    this.navCtrl.push(ArticuloPage);
  }

}
