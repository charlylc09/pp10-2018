import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VentasPage } from '../../pages/ventas/ventas';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  usuario = {
    email: '',
    puntoVta: 1,
    ultNroVta: 0
  }

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public usuariosProvider: UsuariosProvider) {
  }

  doLogin(){
    this.usuariosProvider.getAll()
      .then(usuarios => {
        for(let i=0; i<usuarios.length; i++){
          if(usuarios[i].email == this.usuario.email){
            this.usuariosProvider.usuario = usuarios[i];
            this.navCtrl.setRoot(VentasPage);
            return;
          }
        }

        const alert = this.alertCtrl.create({
          title: '¡Atención!',
          subTitle: 'No se reconoce el usuario, por favor regístrese.',
          buttons: ['Aceptar']
        });
        alert.present();

      })
      .catch( error => {
        console.error( error );
      });
  }

  registrar(){
    this.usuariosProvider.create(this.usuario)
      .then(response => {
        const alert = this.alertCtrl.create({
          title: 'Felicidades',
          subTitle: '¡El registro se ha generado con éxito!',
          buttons: ['Aceptar']
        });
        alert.present();
      })
      .catch( error => {
        console.error( error );
      })
  }

}
