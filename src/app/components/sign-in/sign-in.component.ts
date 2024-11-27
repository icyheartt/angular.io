import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class SignInComponent implements OnInit, OnDestroy {
  isLoginVisible = true;
  email = '';
  password = '';
  registerEmail = '';
  registerPassword = '';
  confirmPassword = '';
  rememberMe = false;
  acceptTerms = false;

  // 포커스 상태 관리
  isEmailFocused = false;
  isPasswordFocused = false;
  isRegisterEmailFocused = false;
  isRegisterPasswordFocused = false;
  isConfirmPasswordFocused = false;

  private cleanupTasks: (() => void)[] = []; // 언마운트 시 정리 작업 저장
errorMessage: any;
  AuthService: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('Component Mounted: SignInComponent');

    // 초기화: Remember Me 기능으로 이메일 유지
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      this.email = rememberedEmail;
      this.rememberMe = true;
    }

    // 윈도우 리사이즈 이벤트 등록
    const handleResize = () => console.log('Window resized!');
    window.addEventListener('resize', handleResize);

    // 정리 작업에 추가
    this.cleanupTasks.push(() => window.removeEventListener('resize', handleResize));
  }

  ngOnDestroy(): void {
    console.log('Component Unmounted: SignInComponent');

    // 정리 작업 실행
    this.cleanupTasks.forEach((task) => task());
  }

  get isLoginFormValid(): boolean {
    return !!this.email && !!this.password;
  }

  get isRegisterFormValid(): boolean {
    return !!this.registerEmail &&
      !!this.registerPassword &&
      !!this.confirmPassword &&
      this.registerPassword === this.confirmPassword &&
      this.acceptTerms;
  }

  toggleCard(): void {
    this.isLoginVisible = !this.isLoginVisible;
    setTimeout(() => {
      document.getElementById('register')?.classList.toggle('register-swap');
      document.getElementById('login')?.classList.toggle('login-swap');
    }, 50);
  }

  focusInput(inputName: string): void {
    switch (inputName) {
      case 'email': this.isEmailFocused = true; break;
      case 'password': this.isPasswordFocused = true; break;
      case 'registerEmail': this.isRegisterEmailFocused = true; break;
      case 'registerPassword': this.isRegisterPasswordFocused = true; break;
      case 'confirmPassword': this.isConfirmPasswordFocused = true; break;
    }
  }

  blurInput(inputName: string): void {
    switch (inputName) {
      case 'email': this.isEmailFocused = false; break;
      case 'password': this.isPasswordFocused = false; break;
      case 'registerEmail': this.isRegisterEmailFocused = false; break;
      case 'registerPassword': this.isRegisterPasswordFocused = false; break;
      case 'confirmPassword': this.isConfirmPasswordFocused = false; break;
    }
  }

  async handleLogin(): Promise<void> {
    console.log('Attempting login:', this.email, this.password); // 디버깅용 로그
    try {
      const success = await this.authService.login(this.email, this.password);
      console.log('Login success:', success); // 결과 확인 로그
  
      if (success) {
        console.log('Redirecting to home...');
        this.router.navigate(['/']); // 홈으로 이동
      } else {
        this.errorMessage = 'Invalid email or password';
        console.warn('Login failed: Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  async handleRegister(): Promise<void> {
    try {
      const success = await this.authService.register(this.registerEmail, this.registerPassword);
      if (success) {
        console.log('Registration successful');
        this.toggleCard(); // 로그인 화면으로 전환
      } else {
        this.errorMessage = 'Email already exists';
      }
    } catch (err) {
      console.error(err);
    }
  }
  
  
}
