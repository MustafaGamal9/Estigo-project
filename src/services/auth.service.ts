import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  
  
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor() { }

  
  login(): void {

    this.isAuthenticatedSubject.next(true);
    console.log('User logged in successfully');
  }


  logout(): void {
    this.isAuthenticatedSubject.next(false);
    console.log('User logged out');
  }


  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}