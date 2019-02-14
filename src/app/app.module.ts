import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { SQLite } from '@ionic-native/sqlite';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera } from '@ionic-native/camera';

//Pages
import { MyApp } from './app.component';
import { VentasPage } from '../pages/ventas/ventas';
import { VentasPagosPage } from '../pages/ventas-pagos/ventas-pagos';
import { VentasItemsPage } from '../pages/ventas-items/ventas-items';
import { VentasItemsDetallePage } from '../pages/ventas-items-detalle/ventas-items-detalle';
import { RecibosPage } from '../pages/recibos/recibos';
import { ArticulosPage } from '../pages/articulos/articulos';
import { ArticuloPage } from '../pages/articulo/articulo';
import { ClientesPage } from '../pages/clientes/clientes';
import { ClientePage } from '../pages/cliente/cliente';
import { CajasPage } from '../pages/cajas/cajas';
import { StockPage } from '../pages/stock/stock';
import { ConfigPage } from '../pages/config/config';
import { CategoriasPage } from '../pages/categorias/categorias';
import { CategoriaPage } from '../pages/categoria/categoria';

import { LoginPage } from '../pages/login/login';

//Providers
import { ArticulosProvider } from '../providers/articulos/articulos';
import { CategoriasProvider } from '../providers/categorias/categorias';
import { ComprobantesProvider } from '../providers/comprobantes/comprobantes';
import { ItemsProvider } from '../providers/items/items';
import { UsuariosProvider } from '../providers/usuarios/usuarios';
import { ClientesProvider } from '../providers/clientes/clientes';

//Components
import { PopoverComponent } from '../components/popover/popover';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PagosProvider } from '../providers/pagos/pagos';


@NgModule({
  declarations: [
    MyApp,
    VentasPage, 
    VentasPagosPage, 
    VentasItemsPage,
    VentasItemsDetallePage,
    RecibosPage,
    ArticulosPage,
    ArticuloPage,
    ClientesPage, 
    ClientePage,
    CajasPage,
    StockPage,
    ConfigPage,
    LoginPage,
    CategoriasPage,
    CategoriaPage,
    PopoverComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    VentasPage, 
    VentasPagosPage,
    VentasItemsPage,
    VentasItemsDetallePage, 
    RecibosPage,
    ArticulosPage,
    ArticuloPage,
    ClientesPage, 
    ClientePage,
    CajasPage,
    StockPage,
    ConfigPage,
    LoginPage,
    CategoriasPage,
    CategoriaPage,
    PopoverComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    BarcodeScanner,
    Camera,
    ArticulosProvider,
    CategoriasProvider,
    ComprobantesProvider,
    ItemsProvider,
    UsuariosProvider,
    ClientesProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PagosProvider
  ]
})
export class AppModule {}
