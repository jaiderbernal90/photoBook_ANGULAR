import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { HistoriasComponent } from './components/historias/historias.component';
import { InicioComponent } from './components/user/inicio/inicio.component';
import { AboutComponent } from './components/user/about/about.component';
import { UsersComponent } from './components/users/users.component';
import { HistoriaComponent } from './components/historias/historia/historia.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, FormBuilder, FormGroup, Validators,FormControl,ReactiveFormsModule } from "@angular/forms";
import { FormCreateHistoriaComponent } from './components/historias/form-create-historia/form-create-historia.component';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { HistoriasAdminComponent } from './components/admin/historias-admin/historias-admin.component';
import { EditComponent } from './components/admin/historias-admin/edit/edit.component';
import { DeleteComponent } from './components/admin/historias-admin/delete/delete.component';
import { SuscripcionesComponent } from './components/admin/suscripciones/suscripciones.component';
import { EditUserComponent } from './components/users/edit/edit.component';
import { CreateUsersComponent } from './components/users/create-users/create-users.component';
import { DeleteUsersComponent } from './components/users/delete-users/delete-users.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HistoriasComponent,
    InicioComponent,
    AboutComponent,
    UsersComponent,
    HistoriaComponent,
    LoginComponent,
    RegisterComponent,
    FormCreateHistoriaComponent,
    HistoriasAdminComponent,
    EditComponent,
    DeleteComponent,
    SuscripcionesComponent,
    EditUserComponent,
    CreateUsersComponent,
    DeleteUsersComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFileUploaderModule,
  ],
  providers: [],
  bootstrap: [HeaderComponent,FooterComponent,AppComponent]
})
export class AppModule { }
