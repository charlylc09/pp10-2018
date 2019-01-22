import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class ArticulosProvider {

  db: SQLiteObject = null;

  constructor(public http: HttpClient) {}

  setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
  }

  create(articulo: any){
    let sql = 'INSERT INTO articulos(codigo, nombre, precio, alicIva, alicInt, src, barcode, idCategoria) VALUES(?,?,?,?,?,?,?,?)';
    return this.db.executeSql(sql, [articulo.codigo, articulo.nombre, articulo.precio, articulo.alicIva, articulo.alicInt, articulo.src, articulo.barcode, articulo.idCategoria]);
  }

  createTable(){
    let sql = 'CREATE TABLE IF NOT EXISTS articulos(id INTEGER PRIMARY KEY AUTOINCREMENT, codigo NUMERIC, nombre TEXT, precio NUMERIC, alicIva NUMERIC, alicInt NUMERIC, src TEXT, barcode TEXT, idCategoria NUMERIC)';
    return this.db.executeSql(sql, []);
  }

  delete(articulo: any){
    let sql = 'DELETE FROM articulos WHERE id=?';
    return this.db.executeSql(sql, [articulo.id]);
  }

  update(articulo: any){
    let sql = 'UPDATE articulos SET codigo=?, nombre=?, precio=?, alicIva=?, alicInt=?, src=?, barcode=?, idCategoria=? WHERE id=?';
    return this.db.executeSql(sql, [articulo.codigo, articulo.nombre, articulo.precio, articulo.alicIva, articulo.alicInt, articulo.src, articulo.barcode, articulo.idCategoria, articulo.id]);
  }

  getAll(){
    let sql = 'SELECT * FROM articulos';
    return this.db.executeSql(sql, [])
    .then(response => {
      let articulos = [];
      for (let index = 0; index < response.rows.length; index++) {
        articulos.push( response.rows.item(index) );
      }
      return Promise.resolve( articulos );
    })
    .catch(error => Promise.reject(error));
  }

  getFull(){
    let sql = 'SELECT a.id, a.codigo, a.nombre, a.precio, a.alicIva, a.alicInt, a.src, a.barcode, a.idCategoria, b.nombre as categoria, b.src as catSrc FROM articulos a LEFT JOIN categorias b ON a.idCategoria = b.id';
    return this.db.executeSql(sql, [])
    .then(response => {
      let articulos = [];
      for (let index = 0; index < response.rows.length; index++) {
        articulos.push( response.rows.item(index) );
      }
      return Promise.resolve( articulos );
    })
    .catch(error => Promise.reject(error));
  }

}
