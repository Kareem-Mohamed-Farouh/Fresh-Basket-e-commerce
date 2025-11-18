import { Component, inject, Inject, OnInit } from '@angular/core';
import { OrdersService } from '../../../core/services/orders/orders.service';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-allorder',
  imports: [],
  templateUrl: './allorder.component.html',
  styleUrl: './allorder.component.scss',
})
export class AllorderComponent implements OnInit {
  private readonly ordersService = inject(OrdersService);

  ngOnInit(): void {
    const userData = jwtDecode(localStorage.getItem('basketToken')!);
    console.log(userData);
  }

  // getUserOrder() {
  //   this.ordersService.getUserOrder().subscribe({
  //     next: (res) => {},
  //   });
  // }
}
