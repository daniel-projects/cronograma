import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  senha: string;
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {

  }

  async login() {
    const data = await this.afAuth.auth.signInWithEmailAndPassword(this.email, this.senha);
    console.log(data);
    this.router.navigate(['/']);
  }
  esqueci() {

  }
  ngOnInit() {
  }

}
