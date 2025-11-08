import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/services/auth.service';
import { AllorderService } from './services/allorder.service';
import { Orders } from './models/orders.interface';
@Component({
  selector: 'app-allorders',
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent implements OnInit {
  private readonly authService = inject(AuthService)
  private readonly allorderService = inject(AllorderService)

  token!: any;
  orders!: any;


  ngOnInit(): void {
    this.token = this.authService.deCodToken()
    this.showUserOrder();
  }


  showUserOrder(): void {
    this.allorderService.getUserOrder(this.token.id).subscribe({
      next: (res) => {

        console.log(res);
        this.orders = res

      }, error: (err) => {
        console.log(err);

      }
    })
  }





}
