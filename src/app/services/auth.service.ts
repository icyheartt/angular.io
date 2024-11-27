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
  register(email: string, password: string): Promise<boolean> {
    const users = this.getUsers();
    if (users[email]) {
      return Promise.resolve(false); // 이미 존재하는 계정
    }
    users[email] = password;
    this.saveUsers(users);
    return Promise.resolve(true); // 성공
  }
  
  

  // 로그인
  login(email: string, password: string): Promise<boolean> {
    console.log('AuthService.login called with:', email, password); // 디버깅용 로그
    const users = this.getUsers();
    const storedPassword = users[email];
    if (storedPassword && storedPassword === password) {
      localStorage.setItem(this.loggedInKey, email);
      return Promise.resolve(true); // 로그인 성공
    }
    return Promise.resolve(false); // 로그인 실패
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
    const users = localStorage.getItem(this.storageKey);
    return users ? JSON.parse(users) : {};
  }
  
  private saveUsers(users: { [key: string]: string }): void {
    console.log('saveUsers called with:', users); // 저장 데이터 출력
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }
  
}
