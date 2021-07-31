import { Component, OnInit } from '@angular/core';
import { SubscriptionsService } from './services/suscripciones.service';
import { tap } from 'rxjs/operators';
import { Subscription } from './interfaces/suscripciones.interface';

@Component({
  selector: 'app-suscripciones',
  templateUrl: './suscripciones.component.html',
  styleUrls: ['./suscripciones.component.css']
})
export class SuscripcionesComponent implements OnInit {

  suscripciones !: Subscription[];
  mensaje:string = '';
  mensajeError:string = '';

  constructor(private SubscriptionsSvc: SubscriptionsService) {}

  ngOnInit(): void {
    this.listarHistorias();
  }

  listarHistorias(): void{
    this.SubscriptionsSvc.getSubscriptions().pipe(
      tap((suscripciones : Subscription[]) => {this.suscripciones = suscripciones})
    ).subscribe();
  }


}
