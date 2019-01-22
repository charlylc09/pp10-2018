import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CategoriasProvider } from '../../providers/categorias/categorias';


@IonicPage()
@Component({
  selector: 'page-categoria',
  templateUrl: 'categoria.html',
})
export class CategoriaPage {

  categoria = {
    id: null,
    nombre: "",
    src: ""
  };

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private camera: Camera,
              public categoriasProvider: CategoriasProvider) {

                if(this.navParams.get('categoria')!=null){
                  this.categoria = this.navParams.get('categoria');
                }
  }

  saveCategoria(){
    if(this.categoria.id == null){
      //CREATE
      this.categoriasProvider.create(this.categoria)
      .then(response => {
        this.navCtrl.pop();
      })
      .catch( error => {
        console.error( error );
      })
    }else{
      //UPDATE
      this.categoriasProvider.update(this.categoria)
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
      this.categoria.src = imageData;
    })
    .catch(error =>{
      console.error( error );
    });
  }

}
