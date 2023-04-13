import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  email?: string;
  clave?: string;
  usuario: any;
  error= false;
  user={
    tipo_usuario: "",
    Nombre: "",
    clave: "",

  }

  constructor(private slogin: LoginService,private router:Router) {}

  ngOnInit(): void {

  }
  consulta(){
    this.slogin.consultar(this.email, this.clave).subscribe((result:any) => {
    this.usuario= result;
      if (this.usuario[0].validar == "valida") {
          console.log("entro");
          sessionStorage.setItem('id',this.usuario[0].id_usuario);
          sessionStorage.setItem('nombre',this.usuario[0].Nombre);
          sessionStorage.setItem('tipo',this.usuario[0].tipo_usuario);
          this.router.navigate(['dashboard']);
        }else{
          console.log("no entro");
          this.error=true;
        }
        console.log(result);
    })
  }

}
