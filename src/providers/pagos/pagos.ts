import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class PagosProvider {

  db: SQLiteObject = null;
  public pagos: any[] = [];

  constructor(public http: HttpClient) {}

  setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
  }

  create(pago: any){
    let sql = 'INSERT INTO pagos(idComprobante, importe, tipo) VALUES(?,?,?)';
    return this.db.executeSql(sql, [pago.idComprobante, pago.importe, pago.tipo]);
  }

  createTable(){
    let sql = 'CREATE TABLE IF NOT EXISTS pagos(id INTEGER PRIMARY KEY AUTOINCREMENT, idComprobante INTEGER, importe NUMERIC, tipo NUMERIC)';
    return this.db.executeSql(sql, []);
  }

  delete(pago: any){
    let sql = 'DELETE FROM pagos WHERE id=?';
    return this.db.executeSql(sql, [pago.id]);
  }

  getAll(){
    let sql = 'SELECT * FROM pagos';
    return this.db.executeSql(sql, [])
    .then(response => {
      let pagos = [];
      for (let index = 0; index < response.rows.length; index++) {
        pagos.push( response.rows.pago(index) );
      }
      return Promise.resolve( pagos );
    })
    .catch(error => Promise.reject(error));
  }

  update(pago: any){
    let sql = 'UPDATE pagos SET idComprobante=?, importe=?, tipo=? WHERE id=?';
    return this.db.executeSql(sql, [pago.idComprobante, pago.importe, pago.tipo, pago.id]);
  }

}
