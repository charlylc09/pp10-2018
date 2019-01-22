import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class ItemsProvider {

  db: SQLiteObject = null;
  public item: any;

  constructor(public http: HttpClient) {}

  setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
  }

  create(item: any){
    let sql = 'INSERT INTO items(idArticulo, nombre, cantidad, importe, alicIva, alicInt, total) VALUES(?,?,?,?,?,?,?)';
    return this.db.executeSql(sql, [item.idArticulo, item.nombre, item.cantidad, item.importe, item.alicIva, item.alicInt, item.total]);
  }

  createTable(){
    let sql = 'CREATE TABLE IF NOT EXISTS items(id INTEGER PRIMARY KEY AUTOINCREMENT, idArticulo INTEGER, nombre TEXT, cantidad NUMERIC, importe NUMERIC, alicIva NUMERIC, alicInt NUMERIC, total NUMERIC)';
    return this.db.executeSql(sql, []);
  }

  delete(item: any){
    let sql = 'DELETE FROM items WHERE id=?';
    return this.db.executeSql(sql, [item.id]);
  }

  getAll(){
    let sql = 'SELECT * FROM items';
    return this.db.executeSql(sql, [])
    .then(response => {
      let items = [];
      for (let index = 0; index < response.rows.length; index++) {
        items.push( response.rows.item(index) );
      }
      return Promise.resolve( items );
    })
    .catch(error => Promise.reject(error));
  }

  update(item: any){
    let sql = 'UPDATE items SET idArticulo=?, nombre=?, cantidad=?, importe=?, alicIva=?, alicInt=?, total=? WHERE id=?';
    return this.db.executeSql(sql, [item.idArticulo, item.nombre, item.cantidad, item.importe, item.alicIva, item.alicInt, item.total, item.id]);
  }

}