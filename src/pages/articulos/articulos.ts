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

  public articulos: any[] = [];
  public articulosAll: any[] = [];

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
      this.articulosAll = articulos;
      this.inicializarArticulos();
    })
    .catch( error => {
      console.error( error );
    });
  }

  refreshAllArticulos(){
    this.articulosProvider.getAll()
    .then(articulos => {
      this.articulosAll = articulos;
    })
    .catch( error => {
      console.error( error );
    });
  }

  deletArticulo(articulo: any, index){
    this.articulosProvider.delete(articulo)
    .then(response => {
      this.articulos.splice(index, 1);
      this.refreshAllArticulos();
    })
    .catch( error => {
      console.error( error );
    })
  }

  addArticulo(){
    this.navCtrl.push(ArticuloPage);
  }

  editArticulo(articulo: any){
    this.navCtrl.push(ArticuloPage, {articulo: articulo});
  }

  inicializarArticulos(){
    this.articulos = this.articulosAll;
  }

  filtrarArticulos(event: any){

    this.inicializarArticulos();
    const val = event.target.value;

    if (val && val.trim() != '') {
      this.articulos = this.articulos.filter((articulo) => {
        return (articulo.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
