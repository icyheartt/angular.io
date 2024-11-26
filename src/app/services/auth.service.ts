import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = new Map<string, string>(); // 간단히 LocalStorage 대신 Map 사용

  register(email: string, password: string): Observable<boolean> {
    if (this.users.has(email)) {
      return of(false); // 이미 존재하는 계정
    }
    this.users.set(email, password);
    return of(true); // 성공
  }

  login(email: string, password: string): Observable<boolean> {
    const storedPassword = this.users.get(email);
    return of(storedPassword === password); // 비밀번호 일치 여부 반환
  }
}
