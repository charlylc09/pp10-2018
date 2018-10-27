import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { VentasPage } from '../pages/ventas/ventas';
import { RecibosPage } from '../pages/recibos/recibos';
import { ArticulosPage } from '../pages/articulos/articulos';
import { ClientesPage } from '../pages/clientes/clientes';
import { CajasPage } from '../pages/cajas/cajas';
import { StockPage } from '../pages/stock/stock';
import { ConfigPage } from '../pages/config/config';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any, icon: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Ventas', component: VentasPage, icon: 'cart' },
      { title: 'Recibos', component: RecibosPage, icon: 'cash' },
      { title: 'Artículos', component: ArticulosPage, icon: 'list' },
      { title: 'Clientes', component: ClientesPage, icon: 'people' },
      { title: 'Caja', component: CajasPage, icon: 'calculator' },
      { title: 'Stock', component: StockPage, icon: 'cube' },
      { title: 'Configuración', component: ConfigPage, icon: 'settings' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
