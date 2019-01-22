import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class UsuariosProvider {

  db: SQLiteObject = null;
  public usuario: any;

  constructor(public http: HttpClient) {}

  setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
  }

  create(usuario: any){
    let sql = 'INSERT INTO usuarios(email, puntoVta, ultNroVta) VALUES(?,?,?)';
    return this.db.executeSql(sql, [usuario.email, usuario.puntoVta, usuario.ultNroVta]);
  }

  createTable(){
    let sql = 'CREATE TABLE IF NOT EXISTS usuarios(id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, puntoVta INTEGER, ultNroVta INTEGER)';
    return this.db.executeSql(sql, []);
  }

  delete(usuario: any){
    let sql = 'DELETE FROM usuarios WHERE id=?';
    return this.db.executeSql(sql, [usuario.id]);
  }

  getAll(){
    let sql = 'SELECT * FROM usuarios';
    return this.db.executeSql(sql, [])
    .then(response => {
      let usuarios = [];
      for (let index = 0; index < response.rows.length; index++) {
        usuarios.push( response.rows.item(index) );
      }
      return Promise.resolve( usuarios );
    })
    .catch(error => Promise.reject(error));
  }

  update(usuario: any){
    let sql = 'UPDATE usuarios SET email=?, puntoVta=?, ultNroVta=? WHERE id=?';
    return this.db.executeSql(sql, [usuario.email, usuario.puntoVta, usuario.ultNroVta, usuario.id]);
  }

}
