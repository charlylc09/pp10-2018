import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite';

import { VentasPage } from '../pages/ventas/ventas';
import { RecibosPage } from '../pages/recibos/recibos';
import { ArticulosPage } from '../pages/articulos/articulos';
import { ClientesPage } from '../pages/clientes/clientes';
import { CajasPage } from '../pages/cajas/cajas';
import { StockPage } from '../pages/stock/stock';
import { ConfigPage } from '../pages/config/config';
import { LoginPage } from '../pages/login/login';
import { CategoriasPage } from '../pages/categorias/categorias';

import { ArticulosProvider } from '../providers/articulos/articulos';
import { CategoriasProvider } from '../providers/categorias/categorias';
import { ComprobantesProvider } from '../providers/comprobantes/comprobantes';
import { ItemsProvider } from '../providers/items/items';
import { PagosProvider } from '../providers/pagos/pagos';
import { UsuariosProvider } from '../providers/usuarios/usuarios';
import { ClientesProvider } from '../providers/clientes/clientes';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any, icon: any}>;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              public sqlite: SQLite,
              public articulosProvider: ArticulosProvider,
              public categoriasProvider: CategoriasProvider,
              public comprobantesProvider: ComprobantesProvider,
              public itemsProvider: ItemsProvider,
              public pagosProvider: PagosProvider,
              public usuariosProvider: UsuariosProvider,
              public clientesProvider: ClientesProvider) {
    
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Ventas', component: VentasPage, icon: 'cart' },
      { title: 'Recibos', component: RecibosPage, icon: 'cash' },
      { title: 'Artículos', component: ArticulosPage, icon: 'list' },
      { title: 'Categorías', component: CategoriasPage, icon: 'list' },
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
      this.createDatabase();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  private createDatabase(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default' // the location field is required
    })
    .then((db) => {
      this.articulosProvider.setDatabase(db);
      this.categoriasProvider.setDatabase(db);
      this.comprobantesProvider.setDatabase(db);
      this.itemsProvider.setDatabase(db);
      this.pagosProvider.setDatabase(db);
      this.usuariosProvider.setDatabase(db);
      this.clientesProvider.setDatabase(db);
      this.articulosProvider.createTable();
      this.categoriasProvider.createTable();
      this.comprobantesProvider.createTable();
      this.itemsProvider.createTable();
      this.pagosProvider.createTable();
      this.usuariosProvider.createTable();
      this.clientesProvider.createTable();
    })
    .then(() =>{
      this.splashScreen.hide();
      this.rootPage = LoginPage;
    })
    .catch(error =>{
      console.error(error);
    });
  }
}
