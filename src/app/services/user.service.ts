import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MangaData } from '../auth/interfaces/manga-data';
import { MangaVolume } from '../auth/interfaces/manga-volume';
import { MymangaData } from '../auth/interfaces/mymanga-data';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private meUrl = environment.localAPIUrl + '/users/me';
  private meMangasUrl = environment.localAPIUrl + '/users/me/mangas';
  private meReadVolumesUrl = environment.localAPIUrl + '/users/me/mangas/read';
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
    return this.http.post(this.meMangasAddUrl, mangaData);
  }
  removeMangaFromList(id: number) {
    return this.http.delete(`${this.meMangasDeleteUrl}/${id}`);
  }
  getMyReadVolumesForManga(mangaId: number): Observable<any> {
    return this.http.get(`${this.meReadVolumesUrl}/${mangaId}`);
  }

  setMyReadVolumesForManga(mangaVol: MangaVolume) {
    console.log(mangaVol);
    return this.http.post(this.meReadVolumesUrl, mangaVol);
  }
}
