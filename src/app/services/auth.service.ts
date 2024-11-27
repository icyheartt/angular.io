import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storageKey = 'users';
  private loggedInKey = 'loggedInUser';

  constructor() {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify({}));
    }
  }

  // 회원가입
  register(email: string, password: string): Observable<boolean> {
    console.log('AuthService.register called with:', email, password); // 메서드 호출 로그
    const users = this.getUsers();
    console.log('Users in storage before registration:', users); // 기존 사용자 데이터 출력
  
    if (users[email]) {
      console.warn('Registration failed: Email already exists:', email); // 실패 로그
      return of(false);
    }
  
    users[email] = password;
    this.saveUsers(users);
    console.log('Registration successful for user:', email); // 성공 로그
    return of(true);
  }
  

  // 로그인
  login(email: string, password: string): Observable<boolean> {
    console.log('AuthService.login called with:', email, password); // 메서드 호출 로그
    const users = this.getUsers();
    console.log('Users in storage:', users); // 로컬 스토리지 사용자 데이터 출력
    const storedPassword = users[email];
    console.log('Stored password for user:', storedPassword); // 저장된 비밀번호 확인
  
    if (storedPassword && storedPassword === password) {
      console.log('Login successful for user:', email); // 성공 로그
      localStorage.setItem(this.loggedInKey, email);
      return of(true);
    }
    console.warn('Login failed for user:', email); // 실패 로그
    return of(false);
  }
  

  // 로그아웃
  logout(): void {
    localStorage.removeItem(this.loggedInKey);
  }

  // 로그인 상태 확인
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.loggedInKey);
  }

  // 현재 로그인된 사용자 정보 가져오기
  getLoggedInUser(): string | null {
    return localStorage.getItem(this.loggedInKey);
  }

  private getUsers(): { [key: string]: string } {
    const users = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
    console.log('getUsers called, returning:', users); // 로컬 스토리지 데이터 출력
    return users;
  }
  
  private saveUsers(users: { [key: string]: string }): void {
    console.log('saveUsers called with:', users); // 저장 데이터 출력
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }
  
}
