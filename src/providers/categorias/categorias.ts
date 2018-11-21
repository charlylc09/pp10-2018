import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class CategoriasProvider {

  db: SQLiteObject = null;

  constructor(public http: HttpClient) {}

  setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
  }

  create(categoria: any){
    let sql = 'INSERT INTO categorias(nombre, src) VALUES(?,?)';
    return this.db.executeSql(sql, [categoria.nombre, categoria.src]);
  }

  createTable(){
    let sql = 'CREATE TABLE IF NOT EXISTS categorias(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, src TEXT)';
    return this.db.executeSql(sql, []);
  }

  delete(categoria: any){
    let sql = 'DELETE FROM categorias WHERE id=?';
    return this.db.executeSql(sql, [categoria.id]);
  }

  getAll(){
    let sql = 'SELECT * FROM categorias';
    return this.db.executeSql(sql, [])
    .then(response => {
      let categorias = [];
      for (let index = 0; index < response.rows.length; index++) {
        categorias.push( response.rows.item(index) );
      }
      return Promise.resolve( categorias );
    })
    .catch(error => Promise.reject(error));
  }

  update(categoria: any){
    let sql = 'UPDATE categorias SET nombre=?, src=? WHERE id=?';
    return this.db.executeSql(sql, [categoria.nombre, categoria.src, categoria.id]);
  }

}
