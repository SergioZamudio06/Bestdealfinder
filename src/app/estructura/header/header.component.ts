import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router){}

  ngOnInit(): void {

  }
  cerrar(){
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('Nombre');
    sessionStorage.removeItem('Tipo_usuario');
    this.router.navigate(['login']);

  }
}
