import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { VentasPage } from '../pages/ventas/ventas';
import { RecibosPage } from '../pages/recibos/recibos';
import { ArticulosPage } from '../pages/articulos/articulos';
import { ClientesPage } from '../pages/clientes/clientes';
import { CajasPage } from '../pages/cajas/cajas';
import { StockPage } from '../pages/stock/stock';
import { ConfigPage } from '../pages/config/config';
import { LoginPage } from '../pages/login/login';

import { PopoverComponent } from '../components/popover/popover';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    VentasPage, 
    RecibosPage,
    ArticulosPage,
    ClientesPage, 
    CajasPage,
    StockPage,
    ConfigPage,
    LoginPage,
    PopoverComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    VentasPage, 
    RecibosPage,
    ArticulosPage,
    ClientesPage, 
    CajasPage,
    StockPage,
    ConfigPage,
    LoginPage,
    PopoverComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
