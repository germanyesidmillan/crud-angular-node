import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  disabled: boolean = false;
  tituloUsuario: string = 'Registro Usuarios';
  crearUsuario: boolean = true;

  usuario: any = {
    id: 0,
    nombre: '',
    apellido: null,
    correo: null,
    //pais: "",
    //sexo: "Hombre",
    acepta: false
  };

  usuarios: any = [];

  // paises = [{
  //   codigo: "CRI",
  //   nombre: "Costa Rica"
  // },
  // {
  //   codigo: "ESP",
  //   nombre: "España"
  // }]

  // sexos: string[] = ["Hombre", "Mujer", "Sin definir"]

  constructor(private _user: UsuarioService) { }

  ngOnInit(): void {
    this.obtenertUsuarios();
  }

  guardarUsuario(forma: NgForm) {
    console.log('NgForm', forma.value)
    let payload = {
      firstName: forma.value.nombre,
      lastName: forma.value.apellido,
      email: forma.value.correo
    };

    if (this.crearUsuario) {
      this._user.saveUser(payload).subscribe((resp: any) => {
        console.log('resp', resp);

        if (resp['status'] === 'success') {
          alert(`Se Creó el usuario con id ${resp['data']['id']} exitosamente!`);
          forma.onReset();
          this.obtenertUsuarios();
        } else {
          alert(`Se presentaron problemas al crear el usuario`);
        }

      }, err => {
        console.log('Error', err)
        alert('Error al conectarse con el servidor' + err['message']);
      });

    } else {
      this.modificarUsuario(forma);
    }
  }

  obtenertUsuarios() {
    this.usuarios = [];
    this._user.getUser().subscribe((res: any) => {

      console.log('object', res['data']);
      this.usuarios = res['data'];
      console.log('usuarios', this.usuarios)

    }, err => {
      console.log('Error', err)
      alert('Error al conectarse con el servidor' + err['message']);
    });
  }

  borrarUsuario(id: number) {
    console.log('id', id);
    this._user.deleteUser(id).subscribe((res: any) => {

      if (res['status'] === 'success') {
        alert(`Se eliminó el usuario con id ${res['data']} exitosamente!`);
      } else {
        alert(`Se presentaron problemas al eliminar el usuario con id ${id}`);
      }

      console.log('borrarUsuario', res);
      console.log('usuarios', this.usuarios)

    }, err => {
      console.log('Error', err)
      alert('Error al conectarse con el servidor' + err['message']);
    });
  }


  editarUsuario(id: number) {

    this.tituloUsuario = 'Editar Usuario';
    this.crearUsuario = false;
    this.usuarios.map((u: any) => {
      console.log(u)

      if (u.id === id) {
        console.log(u)
        this.usuario.id = u.id;
        this.usuario.nombre = u.firstName;
        this.usuario.apellido = u.lastName;
        this.usuario.correo = u.email;
        this.usuario.pais = ''
        this.usuario.sexo = '';
        this.usuario.acepta = '';
      }

    });

  }


  modificarUsuario(forma: NgForm) {
    console.log('modificarUsuario', this.usuario)

    let payload = {
      id: this.usuario.id,
      firstName: forma.value.nombre,
      lastName: forma.value.apellido,
      email: forma.value.correo
    };

    this._user.putUser(this.usuario.id, payload).subscribe((resp: any) => {
      console.log(resp)
      if (resp['status'] === 'success') {
        alert(`Se actualizó el usuario con id ${resp['data']['id']} exitosamente!`);
        forma.onReset();
        this.obtenertUsuarios();
        this.crearUsuario = true;
        this.tituloUsuario = 'Registro Usuarios';
      } else {
        alert(`Se presentaron problemas al actualizar el usuario`);
      }

    }, err => {
      console.log('Error', err)
      alert('Error al conectarse con el servidor' + err['message']);
    });

  }


  limpiarFormulario(form: NgForm) {
    this.crearUsuario = true;
    this.tituloUsuario = 'Crear Usuario';
    form.onReset();
  }


}
