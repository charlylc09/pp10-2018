import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class PuntodeventasProvider {

  db: SQLiteObject = null;

  constructor(public http: HttpClient) {}

  setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
  }

  create(puntodeventa: any){
    let sql = 'INSERT INTO puntodeventas(numero, ultNroComp) VALUES(?,?)';
    return this.db.executeSql(sql, [puntodeventa.numero, puntodeventa.ultNroComp]);
  }

  createTable(){
    let sql = 'CREATE TABLE IF NOT EXISTS puntodeventas(id INTEGER PRIMARY KEY AUTOINCREMENT, numero INTEGER, ultNroComp INTEGER)';
    return this.db.executeSql(sql, []);
  }

  delete(puntodeventa: any){
    let sql = 'DELETE FROM puntodeventas WHERE id=?';
    return this.db.executeSql(sql, [puntodeventa.id]);
  }

  getAll(){
    let sql = 'SELECT * FROM puntodeventas';
    return this.db.executeSql(sql, [])
    .then(response => {
      let puntodeventas = [];
      for (let index = 0; index < response.rows.length; index++) {
        puntodeventas.push( response.rows.item(index) );
      }
      return Promise.resolve( puntodeventas );
    })
    .catch(error => Promise.reject(error));
  }

  update(puntodeventa: any){
    let sql = 'UPDATE puntodeventas SET numero=?, ultNroComp=? WHERE id=?';
    return this.db.executeSql(sql, [puntodeventa.numero, puntodeventa.ultNroComp, puntodeventa.id]);
  }

}
