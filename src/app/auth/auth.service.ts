import { Router } from '@angular/router';
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
private tokenExpirationTimer:any;
constructor( private http:HttpClient, private router:Router) { }

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

  logout(){
    this.user.next(null)
   this.router.navigate(['/auth'])
   localStorage.removeItem('userData');
   if(this.tokenExpirationTimer){
     clearTimeout(this.tokenExpirationTimer);
   }
   this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration:number){
  this.tokenExpirationTimer =  setTimeout(()=>{
  this.logout()
},expirationDuration)
  }


private handleAuth(email:string,userId:string, token:string, expiresIn:number){
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, userId, token, expirationDate);
   this.user.next(user);
   this.autoLogout(expiresIn * 100)
   localStorage.setItem('userData',JSON.stringify(user));
}

autoLogin(){
  const userData:{
    email:string;
    id:string;
    _token:string;
    _tokenExpirationDate:string;
  }= JSON.parse(localStorage.getItem('userData'));
  if(!userData){
    return 
  }
  const loadedUser = new User(userData.email, userData.id,userData._token, new Date(userData._tokenExpirationDate))
  if(loadedUser.token){
    this.user.next(loadedUser);
   const expirationDuration = 
   new Date(userData._tokenExpirationDate).getTime() -
    new Date().getTime();
    this.autoLogout(expirationDuration)
  }
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
