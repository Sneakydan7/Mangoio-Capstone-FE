import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  showPassword!: boolean;
  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {}

  register(registerForm: NgForm) {
    try {
      this.authSrv.register(registerForm.value).subscribe();
    } catch (error: any) {
      alert(error);
      this.router.navigate(['/register']);
    }
  }
  showPasswordOrNot() {
    this.showPassword = !this.showPassword;
  }

  goLogin() {
    this.router.navigate(['/login']);
  }
}
