import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriasProvider } from '../../providers/categorias/categorias';
import { CategoriaPage } from '../../pages/categoria/categoria';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  public categorias: any[] = [];
  public categoriasAll: any[] = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public categoriasProvider: CategoriasProvider) {
  }

  ionViewDidLoad(){
    this.getAllCategorias();
  }

  ionViewWillEnter() {
    this.getAllCategorias();
  }

  getAllCategorias(){
    this.categoriasProvider.getAll()
    .then(categorias => {
      this.categoriasAll = categorias;
      this.inicializarCategorias();
    })
    .catch( error => {
      console.error( error );
    });
  }

  refreshAllcategorias(){
    this.categoriasProvider.getAll()
    .then(categorias => {
      this.categoriasAll = categorias;
    })
    .catch( error => {
      console.error( error );
    });
  }

  deletCategoria(categoria: any, index){
    this.categoriasProvider.delete(categoria)
    .then(response => {
      this.categorias.splice(index, 1);
      this.refreshAllcategorias();
    })
    .catch( error => {
      console.error( error );
    })
  }

  addCategoria(){
    this.navCtrl.push(CategoriaPage);
  }

  editCategoria(categoria: any){
    this.navCtrl.push(CategoriaPage, {categoria: categoria});
  }

  inicializarCategorias(){
    this.categorias = this.categoriasAll;
  }

  filtrarCategorias(event: any){

    this.inicializarCategorias();
    const val = event.target.value;

    if (val && val.trim() != '') {
      this.categorias = this.categorias.filter((categoria) => {
        return (categoria.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
