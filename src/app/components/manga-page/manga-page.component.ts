import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MymangaData } from 'src/app/auth/interfaces/mymanga-data';
import { MymangaService } from 'src/app/services/mymanga.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manga-page',
  templateUrl: './manga-page.component.html',
  styleUrls: ['./manga-page.component.scss'],
})
export class MangaPageComponent implements OnInit {
  queryParams!: number;
  foundManga!: any;
  foundMangaOnJikan!: any;
  isClicked: boolean = false;
  genres: string[] = [];
  authors: string[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private myMangaService: MymangaService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.queryParams = params['query'];
      this.getMangaById(this.queryParams);
    });
  }

  getMangaById(id: number) {
    this.myMangaService.getMangaById(id).subscribe((res) => {
      this.foundManga = res;

      this.genres = res.genres
        .replace(/[\[\]']+/g, '')
        .split(',')
        .map((genre: string) => genre.trim());
      this.authors = res.authors
        .replace(/[\[\]']+/g, '')
        .split(',')
        .map((authors: string) => authors.trim());
    });
  }
  getMangaOnJikan(id: number) {
    this.myMangaService.getMangaFromJikan(id).subscribe((res) => {
      this.foundMangaOnJikan = res.data;
    });
  }
  addMangaToList(id: number): void {
    this.userService.getMyMangas().subscribe((mangaList: any[]) => {
      if (mangaList.some((manga) => manga.id === id)) {
        alert('Hai già questo manga nella tua lista!');
        return;
      }

      this.userService.addMangaToList(id).subscribe(() => {
        this.isClicked = true;
        alert('Manga aggiunto con successo!');
        setTimeout(() => {
          this.router.navigate(['/tracker']);
        }, 900);
      });
    });
  }
}
