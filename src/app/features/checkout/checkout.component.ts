import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../shared/components/input/input.component";
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  private readonly fb = inject(FormBuilder)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly cartService = inject(CartService)

  checkoutForm!: FormGroup

  id: string | null = null;

  ngOnInit(): void {
    this.iniform()
    this.getCartId()
  }

  getCartId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.id = urlParams.get('id')
      }
    })
  }

  iniform(): void {
    this.checkoutForm = this.fb.group({
      shippingAddress: this.fb.group({
        details: [null, [Validators.required]],
        phone: [null, [Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)]],
        city: [null, [Validators.required]]
      })
    })
  }
  submitForm(): void {
    if (this.checkoutForm.valid) {

      console.log(this.checkoutForm.value);


      this.cartService.checkoutSession(this.id, this.checkoutForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.status === "success") {
            window.open(res.session.url ,"_self")
          }
        }, error: (err) => {
          console.log(err);
        }
      })

    }
  }
}
