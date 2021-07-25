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


const routes: Routes = [
  {path:'',component:InicioComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'historias',component:HistoriasComponent},
  {path:'historias/crear',component: FormCreateHistoriaComponent},
  {path:'historias/:id',component: HistoriaComponent},
  {path:'inicio',component:InicioComponent},
  {path:'about',component:AboutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
