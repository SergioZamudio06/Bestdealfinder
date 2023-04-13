import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  //variables globales
  verf = false;
  usuario: any;
  iduser:any;
  user ={
    Tipo_usuario:"",
    Nombre:"",
    Correo:"",
    Clave:"",
    Celular:"",
    Direccion:"",
  };
  enviando= false;
  form!: FormGroup;
  beditar = false;

  constructor(
    private userservice:UsuarioService,
    private fb:FormBuilder,
  ){}
    ngOnInit():void {
      this.consulta();
      this.limpiar();
      this.form= this.fb.group({
        Tipo_usuario:[null, [Validators.required]],
        Nombre:[null, [Validators.required]],
        Correo:[null, [Validators.required,Validators.email]],
        Clave:[null, [Validators.required]],
        Celular:[null, [Validators.required]],
        Direccion:[null, [Validators.required]],
      })
    }

    //mostrar formulario
  mostrar(dato:any) {
    switch(dato){
    case 0:
    this.verf = false;
    this.beditar = false;
    this.iduser = "";
    this.limpiar();
    break;
    case 1:
    this.verf = true;
     }
    }

  limpiar(){
    this.user.Tipo_usuario="";
    this.user.Nombre="";
    this.user.Correo="";
    this.user.Clave="";
    this.user.Celular="";
    this.user.Direccion="";

    }

  consulta(){
    this.userservice.consultar().subscribe((result:any) => {
      this.usuario=[];
      this.usuario=result;
    })
  }

  ingresar(){
    this.enviando=true;
    if(this.form.valid){
      this.userservice.insertar(this.form.value).subscribe((datos:any) => {
        console.log(datos);
        if(Object.prototype.hasOwnProperty.call(datos, 'resultado') && datos.resultado === 'OK'){
          //alert(datos['mensaje']);
          this.consulta();
          this.enviando=false;

        }
      });
      this.mostrar(0);

    } else{
      const errors= this.form.errors
      var mensaje= "Formulario no es valido\n"
      mensaje+= JSON.stringify(errors)
      alert(mensaje)
    }
  }


pregunta(id:number,nombre:any){
    Swal.fire({
      title: '¿Esta seguro de borrar el usuario '+nombre + '?',
      text: "El proceso no sera revertido",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si ,Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.borrarusuario(id);
        Swal.fire(
          'Eliminado',
          'El usuario ah sido eliminado',
          'success'
        )
      }
    })
  }


borrarusuario(id:any){
    this.userservice.eliminar(id).subscribe((datos:any) => {
      if(datos['resultado'] =='OK'){
        this.consulta();
      }
    });
  }


cargardatos(datos:any,id:number){
  console.log(datos);
  this.form.controls['Tipo_usuario'].setValue(datos.Tipo_usuario);
  this.form.controls ['Nombre'].setValue(datos.Nombre);
  this.form.controls['Correo'].setValue(datos.Correo);
  this.form.controls['Clave'].setValue(datos.Clave);
  this.form.controls['Celular'].setValue(datos.Celular);
  this.form.controls['Direccion'].setValue(datos.Direccion);
  this.iduser = id;
  this.mostrar(1);
  this.beditar=true;
  }

  editar(){
    this.enviando=true;
    if(this.form.valid){
      this.userservice.edit(this.form.value, this.iduser).pipe(first()).subscribe((datos:any) => {
        if(Object.prototype.hasOwnProperty.call(datos, 'resultado') && datos.resultado === 'OK'){
          this.consulta();
          this.beditar=false;
        }
      });
      this.mostrar(0);
    } else{
      const errors= this.form.errors
      var mensaje= "Formulario no es valido\n"
      mensaje+= JSON.stringify(errors)
      alert(mensaje)
    }
  }
}
