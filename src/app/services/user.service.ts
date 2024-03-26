import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MangaData } from '../auth/interfaces/manga-data';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private meUrl = environment.localAPIUrl + '/users/me';
  private meMangasUrl = environment.localAPIUrl + '/users/me/mangas';
  private meMangasAddUrl = environment.localAPIUrl + '/users/me/add';
  private meMangasDeleteUrl = environment.localAPIUrl + '/users/me/remove';
  constructor(private http: HttpClient) {}

  getMe(): Observable<any> {
    return this.http.get(`${this.meUrl}`);
  }

  getMyMangas(): Observable<any> {
    return this.http.get(`${this.meMangasUrl}`);
  }

  addMangaToList(id: number) {
    const mangaData: MangaData = { id: id };
    return this.http.post(`${this.meMangasAddUrl}`, mangaData);
  }
  removeMangaFromList(id: number) {
    return this.http.delete(`${this.meMangasDeleteUrl}/${id}`);
  }
}
