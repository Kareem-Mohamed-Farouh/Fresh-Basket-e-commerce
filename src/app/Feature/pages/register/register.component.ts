import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  eyeIcon: WritableSignal<boolean> = signal(false);
  eyeeIcon: WritableSignal<boolean> = signal(false);
  token: WritableSignal<string> = signal('');
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);
  private readonly PLATFORM_ID = inject(PLATFORM_ID);
  private readonly formBuilder = inject(FormBuilder);

  registerForm!: FormGroup;

  ngOnInit(): void {
    (this.registerForm = this.formBuilder.group({
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'),
        ],
      ],
      rePassword: [null, [Validators.required]],
      phone: [
        null,
        [Validators.required, Validators.pattern('^01[0|1|2|5][0-9]{8}$')],
      ],
    })),
      { validators: [this.passwordMatchValidator] };
  }

  registerSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.signup(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.toastr.success('Registration successful!', 'Success');
          if (response.message == 'success') {
            this.router.navigate(['/login']);
            this.token.set(response.token);
            localStorage.setItem('Token', this.token());
          }
        },
        error: (error) => {
          console.error('Registration failed:', error);
          this.toastr.error('Registration failed. Please try again.', 'Error');
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  showPass(): void {
    this.eyeIcon.set(!this.eyeIcon());
  }

  showRePass(): void {
    this.eyeeIcon.set(!this.eyeeIcon());
  }

  passwordMatchValidator(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;

    return password === rePassword ? null : { mismatch: true };
  }
}
