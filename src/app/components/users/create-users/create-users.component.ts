import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';
import { userService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})
export class CreateUsersComponent implements OnInit {

  user !: User[];
  userS !: any;
  formUser !: FormGroup;
  mensaje:string = '';
  mensajeError:string = '';
  selectedImage:any; 


  constructor(private rutaActiva: ActivatedRoute,private UserSvc: userService, private fb: FormBuilder,private router:Router) {
    this.formUser = this.fb.group({
      name: ['', [Validators.minLength(3),Validators.required,Validators.maxLength(100)]],
      lastName: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(100)]],
      email: ['', [Validators.required,Validators.minLength(8),Validators.email]],
      nickname: ['', [Validators.minLength(3),Validators.required,Validators.maxLength(100)]],
      phone: ['', [Validators.minLength(3),Validators.required,Validators.maxLength(100)]],
    });

  }

  ngOnInit() {}


  onSubmit(){ 
    const date = Date.now();

    this.mensaje = '';
    this.mensajeError= '';    


    if(this.formUser.status == "VALID"){
      this.UserSvc.createUser({ 
        name: this.formUser.value.name,
        lastName: this.formUser.value.lastName,
        email: this.formUser.value.email,
        nickname: this.formUser.value.nickname,
        role: '1',
        password: '',
        phone: this.formUser.value.phone,
        date_modification: new Date(date),
      }).subscribe(respuesta =>{
        console.log(respuesta);

        if(this.isKeyExists(respuesta, 'mensaje')){
          this.mensaje = 'Usuario registrado correctamente';
          setTimeout(() =>{
            this.router.navigate(['administrador/usuarios']);
          },1500)
        }
      } );
    }
    
  }

  isKeyExists(obj:any,key:any){
    return key in obj;
  }
}
