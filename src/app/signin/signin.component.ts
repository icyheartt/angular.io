
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin',
  standalone: true,
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  imports: [CommonModule, FormsModule]
})
export class SigninComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  isLoginMode: boolean = true;
  errorMessage: string = '';

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (this.isLoginMode) {
      this.login();
    } else {
      this.signup();
    }
  }

  login() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === this.email && u.password === this.password);
    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      alert('Login successful!');
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Invalid email or password.';
    }
  }

  signup() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.some((u: any) => u.email === this.email);
    if (userExists) {
      this.errorMessage = 'User already exists!';
      return;
    }
    users.push({ email: this.email, password: this.password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Signup successful! Please log in.');
    this.errorMessage = '';
    this.toggleMode();
  }
}
