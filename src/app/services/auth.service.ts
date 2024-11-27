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
    const users = this.getUsers();
    if (users[email]) {
      return of(false); // 이메일이 이미 존재하면 실패
    }
    users[email] = password;
    this.saveUsers(users);
    return of(true); // 성공
  }

  // 로그인
  login(email: string, password: string): Observable<boolean> {
    const users = this.getUsers();
    const storedPassword = users[email];
    if (storedPassword && storedPassword === password) {
      localStorage.setItem(this.loggedInKey, email);
      return of(true); // 로그인 성공
    }
    return of(false); // 로그인 실패
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
    return JSON.parse(localStorage.getItem(this.storageKey) || '{}');
  }

  private saveUsers(users: { [key: string]: string }): void {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }
}
