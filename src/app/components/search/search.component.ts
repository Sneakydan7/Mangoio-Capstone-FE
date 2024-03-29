import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MymangaService } from 'src/app/services/mymanga.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchedMangas: any[] = [];
  searchInput!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private myMangaService: MymangaService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.searchInput = params['query'];
      this.searchMangasByTitle(this.searchInput);
    });
  }

  searchMangasByTitle(title: string) {
    this.myMangaService
      .getMangasByTitle(0, 32, title)
      .subscribe((response: any) => {
        this.searchedMangas = response.content;
      });
  }

  addMangaToList(id: number): void {
    this.userService.getMyMangas().subscribe((mangaList: any[]) => {
      if (mangaList.some((manga) => manga.id === id)) {
        alert('Hai già questo manga nella tua lista!');
        return;
      }

      this.userService.addMangaToList(id).subscribe(() => {
        alert('Manga aggiunto con successo!');
        setTimeout(() => {
          this.router.navigate(['/tracker']);
        }, 800);
      });
    });
  }
  goToInfo(id: number): void {
    this.router.navigate(['manga', id]);
  }
}
