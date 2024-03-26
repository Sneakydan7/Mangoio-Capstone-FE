import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MymangaService } from 'src/app/services/mymanga.service';

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
    private myMangaService: MymangaService
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
        console.log(response.content);
        this.searchedMangas = response.content;
        console.log(this.searchedMangas);
      });
  }
}
