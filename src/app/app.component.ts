import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  logado = false;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.afAuth.authState.subscribe(
      data => {
        this.logado = data !== null;
        console.log(data);
      }
    )
  }

  async logout() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }
}
