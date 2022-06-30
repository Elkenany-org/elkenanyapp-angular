import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoogleSigninService {
  private auth_2!: gapi.auth2.GoogleAuth
  private subject = new ReplaySubject<gapi.auth2.GoogleUser | null>(1);

  constructor() {
    gapi.load('auth2', () => {
      this.auth_2 = gapi.auth2.init({
        client_id:
          '804758451233-4nib4p2httcp28hjd9g5nju024c8jprg.apps.googleusercontent.com',
      });
    });
  }
  public signin() {
    this.auth_2
      ?.signIn()
      .then((user) => {
        this.subject.next(user)
        console.log(`user data is : ${user.getId}`)
        
      })
      .catch(() => {
        console.log(`null`)
        this.subject.next(null);
      });
  }

  public signOut() {
    this.auth_2?.signOut().then(() => {
      this.subject.next(null);
    });
  }
  public observable(): Observable<gapi.auth2.GoogleUser | null> {
    return this.subject.asObservable();
  }
}
