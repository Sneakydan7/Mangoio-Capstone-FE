import { Component, OnInit, Renderer2 } from '@angular/core';
import { MymangaService } from 'src/app/services/mymanga.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MangaVolume } from 'src/app/auth/interfaces/manga-volume';
import { MymangaData } from 'src/app/auth/interfaces/mymanga-data';
@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss'],
})
export class TrackerComponent implements OnInit {
  myMangas!: MymangaData[];
  myReadMangas!: MymangaData[];
  myMangaReadVolumes!: any[];
  loggedUser!: any;
  displayMangaName!: string;
  displayMangaVolumes!: number;
  displayMangaImage!: string;
  displayMangaId!: number;
  isMangaSelected: boolean = false;
  mangaGenres: Map<string, number> = new Map();
  firstOpenSidebar: boolean = false;

  clickedVolumes: number[] = [];

  imagePath: string = '../../../assets/images/PngItem_635378.png';

  constructor(
    private myMangaService: MymangaService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMe();
    this.getMyMangas();
  }
  getMe() {
    this.userService.getMe().subscribe((response: any) => {
      this.loggedUser = response;
    });
  }

  getMyMangaReadVolumes(mangaId: number): any {
    this.userService
      .getMyReadVolumesForManga(mangaId)
      .subscribe((response: any) => {
        this.myMangaReadVolumes = response;
      });
  }

  setMyMangaReadVolumes(mangaVol: MangaVolume) {
    this.userService.setMyReadVolumesForManga(mangaVol).subscribe();
  }
  getMyMangas(): void {
    this.userService.getMyMangas().subscribe((response: MymangaData[]) => {
      this.myMangas = [];
      this.myReadMangas = [];

      response.forEach((manga: MymangaData) => {
        if (manga.read) {
          this.myReadMangas.push(manga);
        } else {
          this.myMangas.push(manga);
        }
      });

      this.myMangas.sort((a: MymangaData, b: MymangaData) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }
        return 0;
      });
      this.myReadMangas.sort((a: MymangaData, b: MymangaData) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }
        return 0;
      });

      this.mangaGenres = this.countAndRetrieveGenresInMangas(this.myMangas);
      console.log(this.mangaGenres);
      console.log(this.myReadMangas);
    });
  }

  removeMangaForMe(id: number): void {
    this.userService.removeMangaFromList(id).subscribe(() => {
      this.getMyMangas();
      this.router.navigate(['.'], { relativeTo: this.activatedRoute });
    });
  }

  clickedMangaName(name: string): void {
    this.displayMangaName = name;
  }
  clickedMangaVolumes(number: number): void {
    this.displayMangaVolumes = number;
  }
  clickedMangaImage(image: string): void {
    this.displayMangaImage = image;
  }
  clickedMangaId(id: number): void {
    this.displayMangaId = id;
  }

  generateVolumeArray(): number[] {
    return Array.from(
      { length: this.displayMangaVolumes },
      (_, index) => index + 1
    );
  }

  showSide(manga: MymangaData) {
    this.clickedMangaId(manga.id);
    this.clickedMangaImage(manga.imageUrl);
    this.clickedMangaVolumes(manga.volumes);
    this.clickedMangaName(manga.title);

    this.isMangaSelected = true;
    this.firstOpenSidebar = true;
    this.clickedVolumes = [];

    this.userService
      .getMyReadVolumesForManga(manga.id)
      .subscribe((response: any) => {
        this.myMangaReadVolumes = response;

        for (let i = 0; i < response.length; i++) {
          const currentVol = response[i];
          this.clickedVolumes.push(currentVol.volNumber);
        }
      });
  }

  hideSide() {
    this.isMangaSelected = false;
  }

  addCoin(event: MouseEvent): void {
    const button = event.currentTarget as HTMLButtonElement;
    const container = button.parentElement;

    if (container) {
      const c = document.createElement('img');
      c.className = 'coin';
      c.src = this.imagePath;
      c.style.width = '20px';
      c.style.height = '20px';
      c.style.position = 'absolute';
      c.style.transformOrigin = 'center bottom';
      c.style.animation = 'bounce 0.8s forwards';
      c.addEventListener('animationend', () => {
        container.removeChild(c);
      });
      container.appendChild(c);
    }
  }

  markVolumeAsRead(mangaId: number, volNumber: number): void {
    this.clickedVolumes.push(volNumber);
    this.userService
      .setMyReadVolumesForManga({ mangaId, volNumber })
      .subscribe(() => {
        this.getMyMangas();
      });
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
