import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClientesProvider } from '../../providers/clientes/clientes';

@IonicPage()
@Component({
  selector: 'page-cliente',
  templateUrl: 'cliente.html',
})
export class ClientePage {

  cliente = {
    id: null,
    razonSocial: "",
    documento: null,
    catIva: 0,
    direccion: "",
    codPostal: null,
    provincia: null
  };

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public clientesProvider: ClientesProvider) {

                if(this.navParams.get('cliente')!=null){
                  this.cliente = this.navParams.get('cliente');
                }
  }

  saveCliente(){
    if(this.cliente.id == null){
      //CREATE
      this.clientesProvider.create(this.cliente)
      .then(response => {
        this.navCtrl.pop();
      })
      .catch( error => {
        console.error( error );
      })
    }else{
      //UPDATE
      this.clientesProvider.update(this.cliente)
      .then(response => {
        this.navCtrl.pop();
      })
      .catch( error => {
        console.error( error );
      })
    }
  }

}
