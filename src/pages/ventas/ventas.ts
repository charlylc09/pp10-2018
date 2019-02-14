import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Content } from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover';
import { ArticulosProvider } from '../../providers/articulos/articulos';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { VentasPagosPage } from '../../pages/ventas-pagos/ventas-pagos';
import { VentasItemsPage } from '../../pages/ventas-items/ventas-items';
import { VentasItemsDetallePage } from '../../pages/ventas-items-detalle/ventas-items-detalle';
import { ComprobantesProvider } from '../../providers/comprobantes/comprobantes';
import { ItemsProvider } from '../../providers/items/items';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-ventas',
  templateUrl: 'ventas.html',
})
export class VentasPage {

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
              public itemsProvider: ItemsProvider,
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

  ionViewWillEnter() {
    this.calcularTotales();
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
      ev: myEvent
    });
  }

  inicializarComprobante(){
    this.comprobantesProvider.comprobante = {
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

    this.itemsProvider.items = [];
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
    for(let i=0; i<this.itemsProvider.items.length; i++){

      if(this.itemsProvider.items[i].idArticulo == articulo.id){
        this.itemsProvider.items[i].cantidad = parseFloat(this.itemsProvider.items[i].cantidad) + 1;
        this.itemsProvider.items[i].total = parseFloat(this.itemsProvider.items[i].cantidad) * parseFloat(this.itemsProvider.items[i].importe);
        existe = true;
      }
    }

    if(!existe){

      this.itemsProvider.items.unshift({
          idComprobante: null,
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
    this.cantArticulos = this.comprobantesProvider.calcularTotales();
  }

  deletItem(index){
    this.itemsProvider.items.splice(index, 1);
    this.calcularTotales();
  }

  incrementItem(index){
    this.itemsProvider.items[index].cantidad = parseFloat(this.itemsProvider.items[index].cantidad) + 1;
    this.itemsProvider.items[index].total = parseFloat(this.itemsProvider.items[index].cantidad) * parseFloat(this.itemsProvider.items[index].importe);
    this.calcularTotales();
  }

  decrementItem(index){
    if(parseFloat(this.itemsProvider.items[index].cantidad)>1){
      this.itemsProvider.items[index].cantidad = parseFloat(this.itemsProvider.items[index].cantidad) - 1;
      this.itemsProvider.items[index].total = parseFloat(this.itemsProvider.items[index].cantidad) * parseFloat(this.itemsProvider.items[index].importe);
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
            this.itemsProvider.items = [];
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
    this.itemsProvider.items.unshift({
        idComprobante: null,
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
    this.navCtrl.push(VentasPagosPage);
  }

  onResize(){
    this.contentItems.resize();
  }

  onActionItemDetalle(index){
    this.navCtrl.push(VentasItemsDetallePage, {index: index});
  }

  onActionItems(){
    this.navCtrl.push(VentasItemsPage);
  }

}
