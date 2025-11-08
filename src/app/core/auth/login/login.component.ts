import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { InputComponent } from "../../../shared/components/input/input.component";
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  private readonly cookieService = inject(CookieService)

  msgError: string = ""
  isLogin: boolean = false
  signup: boolean = true
  subscription:Subscription = new Subscription();

  // form Group 
  formLogin: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]),//Minimum eight characters, at least one letter, one number and one special character:
  })

  ruoterTosignup(): void {
    this.router.navigate(['/register'])
  }

  // submet email
  submit(): void {
    if (this.formLogin.valid) {
      this.isLogin = true
      this.subscription.unsubscribe()

     this.subscription = this.authService.loginForm(this.formLogin.value).subscribe({
        next: (res) => {
          console.log(res);

          if (res.message === "success") {
            // saved token 
            this.cookieService.set('token' , res.token)
            this.authService.deCodToken()
            console.log(this.authService.deCodToken());
            console.log(this.cookieService.get('token'));
            
            // naveeget to login 
            setTimeout(() => {
              this.router.navigate(['/home'])
            }, 200);
          }
          this.signup = true

          this.isLogin = false
        },
        error: (err) => {
          console.log(err);
          this.msgError = err.error.message;
          this.isLogin = false
          this.signup = false

        }
      })
      // console.log(this.formLogin.valid);
    }
  }
}

