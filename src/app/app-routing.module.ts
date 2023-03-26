import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modulos/dashboard/dashboard.component';
import { LoginComponent } from './modulos/login/login.component';
import { PrincipalComponent } from './modulos/principal.component';
import { UsuarioComponent } from './modulos/usuario/usuario.component';

const routes: Routes = [
  {
    path: "", component: PrincipalComponent,
    children: [
      {path: "dashboard", component: DashboardComponent},
      {path: "usuario", component: UsuarioComponent},
      {path: "", redirectTo: "/dashboard", pathMatch: "full"},

    ]
  },
  {path: "login", component: LoginComponent},

];

//const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
