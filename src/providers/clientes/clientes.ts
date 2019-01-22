import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class ClientesProvider {

  db: SQLiteObject = null;

  constructor(public http: HttpClient) {}

  setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
  }

  create(cliente: any){
    let sql = 'INSERT INTO clientes(razonSocial,documento,catIva,direccion,codPostal,provincia,localidad) VALUES(?,?,?,?,?,?,?)';
    return this.db.executeSql(sql, [
      cliente.razonSocial,
      cliente.documento,
      cliente.catIva,
      cliente.direccion,
      cliente.codPostal,
      cliente.provincia,
      cliente.localidad
    ]);
  }

  createTable(){
    let sql = 'CREATE TABLE IF NOT EXISTS clientes(id INTEGER PRIMARY KEY AUTOINCREMENT, razonSocial TEXT, documento INTEGER, catIva INTEGER, direccion TEXT, codPostal INTEGER, provincia INTEGER, localidad TEXT)';
    return this.db.executeSql(sql, []);
  }

  delete(cliente: any){
    let sql = 'DELETE FROM clientes WHERE id=?';
    return this.db.executeSql(sql, [cliente.id]);
  }

  getAll(){
    let sql = 'SELECT * FROM clientes';
    return this.db.executeSql(sql, [])
    .then(response => {
      let clientes = [];
      for (let index = 0; index < response.rows.length; index++) {
        clientes.push( response.rows.item(index) );
      }
      return Promise.resolve( clientes );
    })
    .catch(error => Promise.reject(error));
  }

  update(cliente: any){
    let sql = 'UPDATE clientes SET razonSocial=?, documento=?, catIva=?, direccion=?, codPostal=?, provincia=?, localidad=? WHERE id=?';
    return this.db.executeSql(sql, [
      cliente.razonSocial,
      cliente.documento,
      cliente.catIva,
      cliente.direccion,
      cliente.codPostal,
      cliente.provincia, 
      cliente.localidad,
      cliente.id]);
  }

}