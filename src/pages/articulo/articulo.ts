import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ArticulosProvider } from '../../providers/articulos/articulos';
import { CategoriasProvider } from '../../providers/categorias/categorias';

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
    src: "",
    barcode: "",
    idCategoria: null
  };

  public categorias: any[] = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private camera: Camera,
              public articulosProvider: ArticulosProvider,
              public categoriasProvider: CategoriasProvider) {

                if(this.navParams.get('articulo')!=null){
                  this.articulo = this.navParams.get('articulo');
                }
  }

  ionViewWillEnter() {
    this.getAllCategorias();
  }

  getAllCategorias(){
    this.categoriasProvider.getAll()
    .then(categorias => {
      this.categorias = categorias;
    })
    .catch( error => {
      console.error( error );
    });
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

  getPicture(){
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.FILE_URI,
      saveToPhotoAlbum: true,
      targetWidth: 300,
      targetHeight: 300,
      quality: 50
    }
    this.camera.getPicture( options )
    .then(imageData => {
      this.articulo.src = imageData;
    })
    .catch(error =>{
      console.error( error );
    });
  }

}
