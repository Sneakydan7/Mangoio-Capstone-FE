import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private userService: UserService
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
    this.userService.addMangaToList(id).subscribe();
    alert('MANGA AGGIUNTO CON SUCCESSO');
  }
}
