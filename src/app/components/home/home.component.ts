import { Component, OnInit } from '@angular/core';
import { MymangaService } from 'src/app/services/mymanga.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { MangaData } from 'src/app/auth/interfaces/manga-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  response!: any[];
  mangas!: any[];
  mangasScore!: any[];
  admin = false;
  page!: number;
  pageScore!: number;
  size!: number;
  sizeScore!: number;
  totalElements!: number;
  totalElementsScore!: number;
  totalPages!: number;
  totalPagesScore!: number;

  constructor(
    private myMangaService: MymangaService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {
    this.page = 0;
    this.size = 6;
    this.totalPages = 1;
    this.pageScore = 0;
    this.sizeScore = 6;
    this.totalPagesScore = 1;
  }

  ngOnInit(): void {
    this.getMangas();
    this.getMangasByScore();
  }

  getMangas(): void {
    this.myMangaService
      .getMangas(this.page, this.size)
      .subscribe((response: any) => {
        this.mangas = response.content;
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;
      });
  }

  getMangasByScore(): void {
    this.myMangaService
      .getMangasByScore(this.pageScore, this.sizeScore)
      .subscribe((response: any) => {
        this.mangasScore = response.content;
        this.totalElementsScore = response.totalElements;
        this.totalPagesScore = response.totalPages;
      });
  }

  getMangaByMalId(malId: string): void {
    this.myMangaService.getMangaByMalId(malId).subscribe((response: any) => {
      this.response = [response];
    });
  }

  addMangaToList(id: number): void {
    this.userService.addMangaToList(id).subscribe();
  }

  loadNextPage(): void {
    this.page++;
    this.getMangas();
  }
  loadNextPageScore(): void {
    this.pageScore++;
    this.getMangasByScore();
  }
  loadPreviousPage(): void {
    this.page--;
    this.getMangas();
  }
  loadPreviousPageScore(): void {
    this.pageScore--;
    this.getMangasByScore();
  }
}
