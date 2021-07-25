import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { userService } from '../users/services/user.service';
import { loginService } from './services/login.service';
import { tap } from 'rxjs/operators';
import { User } from '../users/interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email !: string;
  password !: string;
  mensaje:any;

  constructor(public loginService: loginService) { }

  ngOnInit(): void {
  }

  login() {
    const user = {email: this.email, password: this.password};

    // TO DOO REALIZAR UNA FUNCION PARA EL LOGIN. 
    // TO DOO REALIZAR EL FORM PARA SUSCRIPCIONES. 
    // TO DOO INVESTIGAR PARA REALIZAR UN SISTEMA DE LOGIN https://codingpotions.com/angular-login-sesion
    // TO DO CREAR UNA VISTA SENCILLA PARA EL ADMIN
    // TO DO SUBIR IMAGENES A ANGULAR
    
    this.loginService.validateLogin(user)
    .subscribe(respuesta =>{
      console.log(respuesta);
      
    } );
  }

  validarLogin(){

  }

  isKeyExists(obj:any,key:any){
      return obj.hasOwnProperty(key);
  }

}
