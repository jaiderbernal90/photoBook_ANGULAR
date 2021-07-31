import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/user/about/about.component';
import { HistoriaComponent } from './components/historias/historia/historia.component';
import { HistoriasComponent } from './components/historias/historias.component';
import { InicioComponent } from './components/user/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormCreateHistoriaComponent } from './components/historias/form-create-historia/form-create-historia.component';
import { HistoriasAdminComponent } from './components/admin/historias-admin/historias-admin.component';
import { EditComponent } from './components/admin/historias-admin/edit/edit.component';
import { DeleteComponent } from './components/admin/historias-admin/delete/delete.component';
import { SuscripcionesComponent } from './components/admin/suscripciones/suscripciones.component';
import { UsersComponent } from './components/users/users.component';
import { EditUserComponent } from './components/users/edit/edit.component';
import { CreateUsersComponent } from './components/users/create-users/create-users.component';
import { DeleteUsersComponent } from './components/users/delete-users/delete-users.component';

const routes: Routes = [
  {path:'',component:InicioComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'historias',component:HistoriasComponent},
  {path:'historias/crear',component: FormCreateHistoriaComponent},
  {path:'historias/:id',component: HistoriaComponent},
  {path:'administrador/usuarios',component:UsersComponent},
  {path:'administrador/usuarios/crear',component:CreateUsersComponent},
  {path:'administrador/usuarios/editar/:id',component:EditUserComponent},
  {path:'administrador/usuarios/eliminar/:id',component:DeleteUsersComponent},
  {path:'administrador/suscripciones',component:SuscripcionesComponent},
  {path:'administrador/historias',component:HistoriasAdminComponent},
  {path:'administrador/historias/editar/:id',component:EditComponent},
  {path:'administrador/historias/eliminar/:id',component:DeleteComponent},
  {path:'inicio',component:InicioComponent},
  {path:'about',component:AboutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
