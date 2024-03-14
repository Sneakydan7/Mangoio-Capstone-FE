import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  showPassword!: boolean;
  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {}
  login(loginForm: NgForm) {
    try {
      this.authSrv
        .login(loginForm.value)
        .subscribe(() => this.router.navigate(['/home']));
    } catch (error) {
      alert('Login errato!');
      console.log(error);
      this.router.navigate(['/login']);
    }
  }
  showPasswordOrNot() {
    this.showPassword = !this.showPassword;
  }
  goRegister() {
    this.router.navigate(['/register']);
  }
}
