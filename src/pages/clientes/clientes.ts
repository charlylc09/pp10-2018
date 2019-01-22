import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClientesProvider } from '../../providers/clientes/clientes';
import { ClientePage } from '../../pages/cliente/cliente';


@IonicPage()
@Component({
  selector: 'page-clientes',
  templateUrl: 'clientes.html',
})
export class ClientesPage {

  public clientes: any[] = [];
  public clientesAll: any[] = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public clientesProvider: ClientesProvider) {
  }

  ionViewDidLoad(){
    this.getAllClientes();
  }

  ionViewWillEnter() {
    this.getAllClientes();
  }

  getAllClientes(){
    this.clientesProvider.getAll()
    .then(clientes => {
      this.clientesAll = clientes;
      this.inicializarClientes();
    })
    .catch( error => {
      console.error( error );
    });
  }

  refreshAllClientes(){
    this.clientesProvider.getAll()
    .then(clientes => {
      this.clientesAll = clientes;
    })
    .catch( error => {
      console.error( error );
    });
  }

  deletCliente(cliente: any, index){
    this.clientesProvider.delete(cliente)
    .then(response => {
      this.clientes.splice(index, 1);
      this.refreshAllClientes();
    })
    .catch( error => {
      console.error( error );
    })
  }

  addCliente(){
    this.navCtrl.push(ClientePage);
  }

  editCliente(cliente: any){
    this.navCtrl.push(ClientePage, {cliente: cliente});
  }

  inicializarClientes(){
    this.clientes = this.clientesAll;
  }

  filtrarClientes(event: any){

    this.inicializarClientes();
    const val = event.target.value;

    if (val && val.trim() != '') {
      this.clientes = this.clientes.filter((cliente) => {
        return (cliente.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
