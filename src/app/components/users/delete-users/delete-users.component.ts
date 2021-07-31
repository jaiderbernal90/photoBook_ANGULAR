import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { tap } from 'rxjs/operators';
import { userService } from '../services/user.service';
import { User } from '../interfaces/user.interface';
import { FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-delete-users',
  templateUrl: './delete-users.component.html',
  styleUrls: ['./delete-users.component.css']
})
export class DeleteUsersComponent implements OnInit {


  mensaje:string = '';
  mensajeError:string = '';

  constructor(private userSvc: userService,private rutaActiva: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.userSvc.deleteUser(this.rutaActiva.snapshot.params.id).pipe(
      tap((response: any) => {
        if(this.isKeyExists(response, 'mensaje')){
          this.mensaje = 'Usuario eliminado correctamente';
          setTimeout(() =>{
            this.router.navigate(['administrador/usuarios']);
          },1500)
        }
      })
    ).subscribe();
  }
  
  isKeyExists(obj:any,key:any){
    return key in obj;
  }

}
