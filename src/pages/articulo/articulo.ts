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
    id: null,
    codigo: "",
    nombre: "",
    precio: "",
    src: ""
  };

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public articulosProvider: ArticulosProvider) {

                if(this.navParams.get('articulo')!=null){
                  this.articulo = this.navParams.get('articulo');
                }
  }

  saveArticulo(){
    if(this.articulo.id == null){
      //CREATE
      this.articulosProvider.create(this.articulo)
      .then(response => {
        this.navCtrl.pop();
      })
      .catch( error => {
        console.error( error );
      })
    }else{
      //UPDATE
      this.articulosProvider.update(this.articulo)
      .then(response => {
        this.navCtrl.pop();
      })
      .catch( error => {
        console.error( error );
      })
    }
  }

}
