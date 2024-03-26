import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class MymangaService {
  private apiUrl = 'http://localhost:4201/mangas';
  private apiUrlScore = 'http://localhost:4201/mangas/score';
  private userUrl = 'http://localhost:4201/users';
  private searchUrl = 'http://localhost:4201/mangas/search?title=';
  private findMalId = 'http://localhost:4201/mangas/mal';
  constructor(private http: HttpClient) {}

  getMangas(page: number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  getMangaByMalId(mangaId: string): Observable<any> {
    return this.http.get(`${this.findMalId}/${mangaId}`);
  }

  getMangasByTitle(page: number, size: number, title: any): Observable<any> {
    return this.http.get(`${this.searchUrl}${title}&page=${page}&size=${size}`);
  }

  getMangasByScore(page: number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrlScore}?page=${page}&size=${size}`);
  }
}
