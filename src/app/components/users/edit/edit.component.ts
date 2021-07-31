import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';
import { userService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditUserComponent implements OnInit {

  user !: User[];
  userS !: any;
  formUser !: FormGroup;
  mensaje:string = '';
  mensajeError:string = '';
  selectedImage:any; 


  constructor(private rutaActiva: ActivatedRoute,private UserSvc: userService, private fb: FormBuilder,private router:Router) {
    this.listarUsuario();  

    this.formUser = this.fb.group({
      name: ['', [Validators.minLength(3),Validators.required,Validators.maxLength(100)]],
      lastName: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(100)]],
      email: ['', [Validators.required,Validators.minLength(8),Validators.email]],
      nickname: ['', [Validators.minLength(3),Validators.required,Validators.maxLength(100)]],
      phone: ['', [Validators.minLength(3),Validators.required,Validators.maxLength(100)]],
    });

  }

  ngOnInit() {
    this.listarUsuario();
  }

  listarUsuario(): void{
    this.UserSvc.viewUser(this.rutaActiva.snapshot.params.id).pipe(
      tap((user : User[]) => {
        this.userS = user;
        this.formulario();
      })
    ).subscribe();    
  }

  formulario(fb ?: FormBuilder): void{
    this.formUser = this.fb.group({
      name: [this.userS.name, [Validators.minLength(3),Validators.required,Validators.maxLength(100)]],
      lastName: [this.userS.lastName, [Validators.required,Validators.minLength(3),Validators.maxLength(100)]],
      email: [this.userS.email, [Validators.required,Validators.minLength(8),Validators.email]],
      nickname: [this.userS.nickname, [Validators.minLength(3),Validators.required,Validators.maxLength(100)]],
      phone: [this.userS.phone, [Validators.minLength(3),Validators.required,Validators.maxLength(100)]],
    });
  }

  onSubmit(){ 
    const date = Date.now();

    this.mensaje = '';
    this.mensajeError= '';    

    console.log(this.formUser);


    if(this.formUser.status == "VALID"){
      console.log('valid');
      this.UserSvc.updateUser({ 
        name: this.formUser.value.name,
        lastName: this.formUser.value.lastName,
        email: this.formUser.value.email,
        nickname: this.formUser.value.nickname,
        role: '1',
        password: '',
        phone: this.formUser.value.phone,
        date_modification: new Date(date),
      }, this.rutaActiva.snapshot.params.id)
      .subscribe(respuesta =>{
        console.log(respuesta);

        if(this.isKeyExists(respuesta, 'mensaje')){
          this.mensaje = 'Usuario actualizado correctamente';
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
