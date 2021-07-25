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

  constructor() { }

  ngOnInit(): void {
  }

}
