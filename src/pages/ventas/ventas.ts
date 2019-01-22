import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Content } from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover';
import { ArticulosProvider } from '../../providers/articulos/articulos';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { ComprobantesProvider } from '../../providers/comprobantes/comprobantes';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-ventas',
  templateUrl: 'ventas.html',
})
export class VentasPage {

  public comprobante: any;
  public items: any[] = [];
  public articulos: any[] = [];
  public articulosAll: any[] = [];
  
  segmentosArticulos: string = "todos";
  cantArticulos: number = 0;
  calculatorValue: string = "00";

  //@ViewChild(Content) content: Content;
  @ViewChild('contentArticulos') contentArticulos: Content;
  @ViewChild('contentItems') contentItems: Content;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public alertCtrl: AlertController,
              public barcodeScanner: BarcodeScanner,
              public popoverCtrl: PopoverController,
              public articulosProvider: ArticulosProvider,
              public comprobantesProvider: ComprobantesProvider,
              public usuariosProvider: UsuariosProvider) {

                this.getAllArticulos();
                this.inicializarComprobante();
                this.calcularTotales();
  }

  scrollToTop() {
    this.contentArticulos.scrollToTop();
  }

  ionViewDidLoad(){
    this.getAllArticulos();
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
      ev: myEvent
    });
  }

  inicializarComprobante(){
    this.comprobante = {
      numero: this.usuariosProvider.usuario.ultNroComp + 1,
      puntoDeVenta: this.usuariosProvider.usuario.puntoVta,
      codigo: 6, //Factura B
      fechaEmision: new Date(),
      fechaComprobante: new Date(),
      tipo: 0, //Contado, 1 - CtaCte
      estado: 0, //Rendido, 1 - Pendiente, 9 - Anulado
      idCliente: null,
      razonSocial: '',
      documento: '',
      tipoDoc: '80', //CUIT
      direccion: '',
      codPostal: 0,
      provincia: 0,
      localidad: '',
      impTotal: 0,
      impGrav1: 0,
      impGrav2: 0,
      impGrav3: 0,
      impExento: 0,
      impNoGrav: 0,
      impIva: 0,
      impOtrosTrib: 0,
      pagEfectivo: 0,
      pagTarjeta: 0
    };

    this.items = [];
  }

  getAllArticulos(){
    this.articulosProvider.getFull()
    .then(articulos => {
      this.articulosAll = articulos;
      this.inicializarArticulos();
    })
    .catch( error => {
      console.error( error );
    });
  }

  agregarArticulo(articulo) {

    let existe = false;
    for(let i=0; i<this.items.length; i++){

      if(this.items[i].idArticulo == articulo.id){
        this.items[i].cantidad = parseFloat(this.items[i].cantidad) + 1;
        this.items[i].total = parseFloat(this.items[i].cantidad) * parseFloat(this.items[i].importe);
        existe = true;
      }
    }

    if(!existe){

      this.items.unshift({
          idArticulo: articulo.id,
          nombre: articulo.nombre,
          cantidad: 1,
          importe: articulo.precio,
          alicIva: articulo.alicIva,
          alicInt: articulo.alicInt,
          total: articulo.precio
      });
    }

    this.calcularTotales();
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

  calcularTotales(){

    let tmpTotal: number = 0;
    let tmpGrav1: number = 0;
    let tmpGrav2: number = 0;
    let tmpGrav3: number = 0;
    let tmpExento: number = 0;
    let tmpNoGrav: number = 0;
    let tmpIva: number = 0;
    let tmpOtrosTrib: number = 0;
    let tmpNeto: number = 0;
    let tmpCantArt: number = 0;

    for(let i=0; i<this.items.length; i++){
      tmpTotal += this.items[i].total;
      tmpCantArt += this.items[i].cantidad;

      if(this.items[i].alicIva == 0){//Exento
        tmpExento += this.items[i].total;
      }else{
        tmpNeto = (this.items[i].total/(((this.items[i].alicIva + this.items[i].alicint)/100)+1));
        tmpIva += (tmpNeto * (this.items[i].alicIva/100));
        tmpOtrosTrib += (tmpNeto * (this.items[i].alicInt/100));
        if(this.items[i].alicIva == 10.5){
          tmpGrav1 += tmpNeto;
        }
        if(this.items[i].alicIva == 21){
          tmpGrav2 += tmpNeto;
        }
        if(this.items[i].alicIva == 27){
          tmpGrav3 += tmpNeto;
        }
      }

    }

    this.comprobante.total = tmpTotal;
    this.comprobante.impGrav1 = tmpGrav1;
    this.comprobante.impGrav2 = tmpGrav2;
    this.comprobante.impGrav3 = tmpGrav3;
    this.comprobante.impExento = tmpExento;
    this.comprobante.impNoGrav = tmpNoGrav;
    this.comprobante.impIva = tmpIva;
    this.comprobante.impOtrosTrib = tmpOtrosTrib;

    this.cantArticulos = tmpCantArt;
  }

  deletItem(index){
    this.items.splice(index, 1);
    this.calcularTotales();
  }

  incrementItem(index){
    this.items[index].cantidad = parseFloat(this.items[index].cantidad) + 1;
    this.items[index].total = parseFloat(this.items[index].cantidad) * parseFloat(this.items[index].importe);
    this.calcularTotales();
  }

  decrementItem(index){
    if(parseFloat(this.items[index].cantidad)>1){
      this.items[index].cantidad = parseFloat(this.items[index].cantidad) - 1;
      this.items[index].total = parseFloat(this.items[index].cantidad) * parseFloat(this.items[index].importe);
      this.calcularTotales();
    }
  }

  scan(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
     }).catch(err => {
        console.log('Error', err);
     });
  }

  deleteAllItems(){
    let alert = this.alertCtrl.create({
      title: 'Despejar venta',
      message: '¿Confirma limpiar la lista de artículos agregados?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Despejar',
          handler: () => {
            this.items = [];
            this.calcularTotales();
          }
        }
      ]
    });
    alert.present();
  }

  onActionCalcButton(number){
    this.calculatorValue = this.calculatorValue.replace(".","");
    this.calculatorValue = "00" + this.calculatorValue + number;
    this.calculatorValue = this.calculatorValue.substring(0,this.calculatorValue.length-2)+"."+this.calculatorValue.substring(this.calculatorValue.length-2,this.calculatorValue.length);
  }

  onActionCalcDelete(){
    if(parseFloat(this.calculatorValue) < 0.1){
      this.calculatorValue = "00";
    }else{
      this.calculatorValue = this.calculatorValue.replace(".","");
      this.calculatorValue = "00" + this.calculatorValue.substring(0,this.calculatorValue.length-1);
      this.calculatorValue = this.calculatorValue.substring(0,this.calculatorValue.length-2)+"."+this.calculatorValue.substring(this.calculatorValue.length-2,this.calculatorValue.length);
    }
  }

  onActionCalcOKButton(){
    this.items.unshift({
        idArticulo: null,
        nombre: "Varios",
        cantidad: 1,
        importe: parseFloat(this.calculatorValue),
        alicIva: 21,
        alicInt: 0,
        total: parseFloat(this.calculatorValue)
    });

    this.calculatorValue = "00"
    this.calcularTotales();
  }

  onActionCobrar(){
    
  }

  onResize(){
    this.contentItems.resize();
  }

}
