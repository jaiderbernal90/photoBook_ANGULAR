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
    FormCreateHistoriaComponent
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
