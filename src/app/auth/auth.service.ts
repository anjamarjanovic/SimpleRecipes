import { User } from './user-model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject,throwError } from 'rxjs';

export interface AuthResponseData{
  idToken:string;
  email:string;
  refreshToken:string;
  expiresIn:string;
  localId:string;
  registered?:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
user = new BehaviorSubject<User>(null);

constructor( private http:HttpClient) { }

signup(email:string,password:string){
   return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCQJSIVGApnYeaW6GfwyvdXfF22P9P6zYQ',
   { email:email,
     password:password,
     returnSecureToken:true
   })
   .pipe(
     catchError(this.handleError),
     tap(resData=>{
       this.handleAuth(resData.email, resData.localId,resData.idToken, +resData.expiresIn)
     }));
  }

  login(email:string, password:string){
   return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCQJSIVGApnYeaW6GfwyvdXfF22P9P6zYQ', {
      email:email,
     password:password,
     returnSecureToken:true
    }).pipe(
      catchError(this.handleError),
      tap((resData)=>{
        this.handleAuth(resData.email, resData.localId, resData.idToken,+resData.expiresIn)
      }));
  }


private handleAuth(email:string,userId:string, token:string, expiresIn:number){
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, userId, token, expirationDate);
   this.user.next(user);
}

  private handleError(errorResp:HttpErrorResponse){
    let errorMessage = 'An unknown error occurred';
     if(!errorResp.error || !errorResp.error.error){
      return throwError(errorMessage)
     }
    switch(errorResp.error.error.message){
      case 'EMAIL_EXIST':
      errorMessage = 'This email exist already';
      break;
      case "EMAIL_NOT_FOUND":
        errorMessage = 'This email does not exist.'
        break;
      case "INVALID_PASSWORD":
        errorMessage = "This password is not correct";
        break;
    }
    return throwError(errorMessage);
   };

}
