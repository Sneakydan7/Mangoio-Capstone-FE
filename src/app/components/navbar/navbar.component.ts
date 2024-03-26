import { Component, OnInit } from '@angular/core';
import { AuthData } from 'src/app/auth/interfaces/auth-data';
import { AuthService } from 'src/app/auth/service/auth.service';
import { MymangaService } from 'src/app/services/mymanga.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userLoggedIn!: AuthData | null;
  userIsAdmin!: boolean;
  searchInput!: string;

  constructor(
    private authSrv: AuthService,
    private myMangaSrv: MymangaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authSrv.restore();
    this.authSrv.user$.subscribe((user) => {
      this.userLoggedIn = user;
    });
  }

  logout() {
    this.authSrv.logout();
  }

  search(): void {
    this.router.navigate(['search', this.searchInput]);
  }
}
