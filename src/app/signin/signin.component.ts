import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class SignInComponent {
  isLoginVisible = true; // 상태: 로그인 or 회원가입
  email = '';
  password = '';
  registerEmail = '';
  registerPassword = '';
  confirmPassword = '';
  rememberMe = false;
  acceptTerms = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  toggleCard() {
    this.isLoginVisible = !this.isLoginVisible;
    this.errorMessage = '';
  }

  handleLogin(): void {
    console.log('Attempting login with:', this.email, this.password);
  
    this.authService.login(this.email, this.password).subscribe({
      next: (success: boolean) => {
        console.log('Login result:', success);
        if (success) {
          console.log('Navigating to home');
          this.router.navigate(['/']).catch((err) => {
            console.error('Navigation error:', err);
          });
        } else {
          this.errorMessage = 'Invalid email or password';
          console.warn(this.errorMessage);  
        }
      },
      error: (err) => {
        console.error('Error during login:', err);
        this.errorMessage = 'An error occurred during login.';
      },
    });
  }
  

  handleRegister() {
    if (
      !this.registerEmail ||
      !this.registerPassword ||
      !this.confirmPassword
    ) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    if (this.registerPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    if (!this.acceptTerms) {
      this.errorMessage = 'You must accept the terms and conditions.';
      return;
    }

    this.authService.register(this.registerEmail, this.registerPassword).subscribe({
      next: (success: boolean) => {
        if (success) {
          this.toggleCard();
          this.errorMessage = '';
        } else {
          this.errorMessage = 'Email already exists.';
        }
      },
      error: () => {
        this.errorMessage = 'An error occurred during registration.';
      },
    });
  }
}
