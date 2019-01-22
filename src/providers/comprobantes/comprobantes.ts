import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class ComprobantesProvider {

  db: SQLiteObject = null;

  constructor(public http: HttpClient) {}

  setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
  }

  create(comprobante: any){
    let sql = 'INSERT INTO comprobantes(numero,puntoDeVenta,codigo,fechaEmision,fechaComprobante,tipo,estado,idCliente,razonSocial,documento,tipoDoc,direccion,codPostal,provincia,localidad,impTotal,impGrav1,impGrav2,impGrav3,impExento,impNoGrav,impIva,impOtrosTrib,pagEfectivo,pagTarjeta) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    return this.db.executeSql(sql, [
      comprobante.numero,
      comprobante.puntoDeVenta,
      comprobante.codigo,
      comprobante.fechaEmision,
      comprobante.fechaComprobante,
      comprobante.tipo,
      comprobante.estado,
      comprobante.idCliente,
      comprobante.razonSocial,
      comprobante.documento,
      comprobante.tipoDoc,
      comprobante.direccion,
      comprobante.codPostal,
      comprobante.provincia,
      comprobante.localidad,
      comprobante.impTotal,
      comprobante.impGrav1,
      comprobante.impGrav2,
      comprobante.impGrav3,
      comprobante.impExento,
      comprobante.impNoGrav,
      comprobante.impIva,
      comprobante.impOtrosTrib,
      comprobante.pagEfectivo,
      comprobante.pagTarjeta
    ]);
  }

  createTable(){
    let sql = 'CREATE TABLE IF NOT EXISTS comprobantes(id INTEGER PRIMARY KEY AUTOINCREMENT, numero INTEGER, puntoDeVenta INTEGER, codigo INTEGER, fechaEmision INTEGER, fechaComprobante INTEGER, tipo INTEGER, estado INTEGER, idCliente INTEGER, razonSocial TEXT, documento TEXT, tipoDoc INTEGER, direccion TEXT, codPostal INTEGER, provincia INTEGER, localidad TEXT, impTotal NUMERIC, impGrav1 NUMERIC, impGrav2 NUMERIC, impGrav3 NUMERIC, impExento NUMERIC, impNoGrav NUMERIC, impIva NUMERIC, impOtrosTrib NUMERIC, pagEfectivo NUMERIC, pagTarjeta NUMERIC)';
    return this.db.executeSql(sql, []);
  }

  delete(comprobante: any){
    let sql = 'DELETE FROM comprobantes WHERE id=?';
    return this.db.executeSql(sql, [comprobante.id]);
  }

  getAll(){
    let sql = 'SELECT * FROM comprobantes';
    return this.db.executeSql(sql, [])
    .then(response => {
      let comprobantes = [];
      for (let index = 0; index < response.rows.length; index++) {
        comprobantes.push( response.rows.item(index) );
      }
      return Promise.resolve( comprobantes );
    })
    .catch(error => Promise.reject(error));
  }

  update(comprobante: any){
    let sql = 'UPDATE comprobantes SET numero=?, puntoDeVenta=?, codigo=?, fechaEmision=?, fechaComprobante= ?,tipo=?, estado=?, idCliente=?, razonSocial=?, documento=?, tipoDoc=?, direccion=?, codPostal=?, provincia=?, localidad=?, impTotal=?, impGrav1=?, impGrav2=?, impGrav3=?, impExento=?, impNoGrav=?, impIva=?, impOtrosTrib=?, pagEfectivo=?, pagTarjeta=? WHERE id=?';
    return this.db.executeSql(sql, [
      comprobante.numero,
      comprobante.puntoDeVenta,
      comprobante.codigo,
      comprobante.fechaEmision,
      comprobante.fechaComprobante,
      comprobante.tipo,
      comprobante.estado,
      comprobante.idCliente,
      comprobante.razonSocial,
      comprobante.documento,
      comprobante.tipoDoc,
      comprobante.direccion,
      comprobante.codPostal,
      comprobante.provincia,
      comprobante.localidad,
      comprobante.impTotal,
      comprobante.impGrav1,
      comprobante.impGrav2,
      comprobante.impGrav3,
      comprobante.impExento,
      comprobante.impNoGrav,
      comprobante.impIva,
      comprobante.impOtrosTrib,
      comprobante.pagEfectivo,
      comprobante.pagTarjeta, 
      comprobante.id]);
  }

}
