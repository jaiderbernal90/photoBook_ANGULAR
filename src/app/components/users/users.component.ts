import { Component, OnInit } from '@angular/core';
import { userService } from './services/user.service';
import { tap } from 'rxjs/operators';
import { User } from './interfaces/user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users !: User[];
  mensaje:string = '';
  mensajeError:string = '';

  constructor(private userSvc: userService) { }

  ngOnInit(): void {
    this.listarHistorias();
  }

  listarHistorias(): void{
    this.userSvc.getUsers().pipe(
      tap((users : User[]) => {
        this.users = users;
      })
    ).subscribe();
  }

  // eliminarHistoria(id: any){
  //   this.userSvc.deleteHistoria(id).pipe(
  //     tap((response: any) => {
  //       console.log(response);
  //       if(this.isKeyExists(response, 'mensaje')){
  //         this.mensaje = 'Historia borrada correctamente';
  //         this.listarHistorias();
  //       }
  //     })
  //   ).subscribe();
  // }

  isKeyExists(obj:any,key:any){
    return key in obj;
  }

}
