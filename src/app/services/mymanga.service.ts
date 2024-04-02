import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { MymangaData } from '../auth/interfaces/mymanga-data';
@Injectable({
  providedIn: 'root',
})
export class MymangaService {
  private apiUrl = 'http://localhost:4201/mangas';
  private apiUrlScore = 'http://localhost:4201/mangas/score';
  private userUrl = 'http://localhost:4201/users';
  private searchUrl = 'http://localhost:4201/mangas/search?title=';
  private findMalId = 'http://localhost:4201/mangas/mal';
  private malUrl = 'https://api.jikan.moe/v4/manga';

  constructor(private http: HttpClient) {}

  getMangas(page: number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  getMangaByMalId(mangaId: string): Observable<any> {
    return this.http.get(`${this.findMalId}/${mangaId}`);
  }

  getMangaById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getMangasByTitle(page: number, size: number, title: any): Observable<any> {
    return this.http.get(`${this.searchUrl}${title}&page=${page}&size=${size}`);
  }

  getMangasByScore(page: number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrlScore}?page=${page}&size=${size}`);
  }

  getMangaFromJikan(id: number): Observable<any> {
    return this.http.get(`${this.malUrl}/${id}/full`);
  }

  countAndRetrieveGenresInMangas(myMangas: MymangaData[]): Map<string, number> {
    const genreCounts: Map<string, number> = new Map();

    myMangas.forEach((manga) => {
      const genres = manga.genres
        .replace(/[\[\]']+/g, '')
        .split(',')
        .map((genre: string) => genre.trim());
      genres.forEach((genre) => {
        if (genreCounts.has(genre)) {
          genreCounts.set(genre, genreCounts.get(genre)! + 1);
        } else {
          genreCounts.set(genre, 1);
        }
      });
    });

    return genreCounts;
  }
}
