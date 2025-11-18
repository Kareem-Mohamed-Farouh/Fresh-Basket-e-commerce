import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../base/environments/baseurl.environment';
import { authEndPoint } from '../../base/enums/auth.endpoint';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}
  LogInBtn: WritableSignal<boolean> = signal(true);
  signup(userData: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}${authEndPoint.signUp}`,
      userData
    );
  }
  signIn(userData: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}${authEndPoint.signIn}`,
      userData
    );
  }

  forgetPassword(email: string): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}${authEndPoint.forgetPassword}`,
      { email: email }
    );
  }

  veryfiyRsetCode(code: string): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}${authEndPoint.verfiyResetCode}`,
      { code: code }
    );
  }

  updateUserPassword(userData: object): Observable<any> {
    return this.httpClient.put(
      `${environment.baseUrl}${authEndPoint.updateUserPasword}`,
      userData
    );
  }

  resetPasword(userData: object): Observable<any> {
    return this.httpClient.put(
      `${environment.baseUrl}${authEndPoint.resetPassword}`,
      userData
    );
  }
  updateUserData(userData: object): Observable<any> {
    return this.httpClient.put(
      `${environment.baseUrl}${authEndPoint.updateUserData}`,
      userData
    );
  }
  getAllUser(): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}${authEndPoint.getAllUser}`
    );
  }
  verifyToken(): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}${authEndPoint.verifyToken}`
    );
  }
}
