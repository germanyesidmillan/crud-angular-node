import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  API = environment.URL;

  constructor(private http: HttpClient) { }

  getUser() {
    console.log('service', this.API);
    return this.http.get(this.API + '/User').pipe(map(resp => resp));
  }

  saveUser(payload: any) {
    console.log('payload', payload)
    return this.http.post(this.API + '/User', payload);
  }

  deleteUser(id: any) {
    return this.http.delete(`${this.API}/User/${id}`);
  }

  putUser(id: any, payload: any) {
    console.log("id", id)
    console.log("payload", payload)
    return this.http.put(`${this.API}/User/${id}`, payload);
  }



}
