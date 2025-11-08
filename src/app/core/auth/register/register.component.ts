import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { InputComponent } from "../../../shared/components/input/input.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  flag: Boolean = true
  msgError: string = ""
  isLogin: boolean = false
  subscription:Subscription = new Subscription()

  ngOnInit(): void {
    this.initForm()
  }

  // form Group 
  formRegitertion!: FormGroup

  initForm(): void {
    this.formRegitertion = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]),//Minimum eight characters, at least one letter, one number and one special character:
      rePassword: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)]),
    }, { validators: [this.comfirmtionPassword] })
  }

  // comfirmtionPassword
    
  comfirmtionPassword(group: AbstractControl) {

    let password = group.get('password')?.value
    let rePassword = group.get('rePassword')?.value
    if (password == rePassword) {
      return null
    } else {
      group.get('rePassword')?.setErrors({ misMatch: true })
      return { misMatch: true }
    }
  }

  // submet email
  submit(): void {
    
    if (this.formRegitertion.valid == true) {
      this.isLogin = true
      this.subscription.unsubscribe()

     this.subscription = this.authService.registrForm(this.formRegitertion.value).subscribe({
        next: (res) => {
          console.log(res);

          // naveeget to login 
          if (res.message == "success") {
            setTimeout(() => {
              this.router.navigate(['/login'])
            }, 200);
          }
          this.isLogin = false
        },
        error: (err) => {
          console.log(err);
          this.msgError = err.error.message;
          this.isLogin = false

        }
      })
      console.log(this.formRegitertion.valid);
    } else {
      // show all erroes
      this.formRegitertion.markAllAsTouched()
      this.formRegitertion.get('rePassword')?.patchValue('')  
    }

  }
}
