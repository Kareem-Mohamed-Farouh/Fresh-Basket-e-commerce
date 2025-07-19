import { Component, inject, signal, WritableSignal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  userToken: WritableSignal<string> = signal<string>('');

  loginForm: FormGroup = this.formBuilder.group({
    email: [null, [Validators.email, Validators.required]],
    password: [
      null,
      [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)],
    ],
  });

  submitloginform() {
    if (this.loginForm.valid) {
      this.authService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          // console.log(res);
          if (res.message == 'success') {
            this.userToken.set(res.token);
            localStorage.setItem('basketToken', res.token);
            this.router.navigate(['/home']);
          }
        },
      });
    }
  }
}
