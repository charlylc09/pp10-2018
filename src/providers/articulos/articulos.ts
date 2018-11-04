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
    let sql = 'INSERT INTO articulos(codigo, nombre, precio, src) VALUES(?,?,?,?)';
    return this.db.executeSql(sql, [articulo.codigo, articulo.nombre, articulo.precio, articulo.src]);
  }

  createTable(){
    let sql = 'CREATE TABLE IF NOT EXISTS articulos(id INTEGER PRIMARY KEY AUTOINCREMENT, codigo NUMERIC, nombre TEXT, precio NUMERIC, src TEXT)';
    return this.db.executeSql(sql, []);
  }

  delete(articulo: any){
    let sql = 'DELETE FROM articulos WHERE id=?';
    return this.db.executeSql(sql, [articulo.id]);
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

  update(articulo: any){
    let sql = 'UPDATE articulos SET codigo=?, nombre=?, precio=?, src=? WHERE id=?';
    return this.db.executeSql(sql, [articulo.codigo, articulo.nombre, articulo.precio, articulo.src, articulo.id]);
  }

}
