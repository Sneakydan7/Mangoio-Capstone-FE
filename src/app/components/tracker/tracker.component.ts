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
  myMangas!: any[];
  myMangaReadVolumes!: any[];
  loggedUser!: any;
  displayMangaName!: string;
  displayMangaVolumes!: number;
  displayMangaImage!: string;
  displayMangaId!: number;
  isMangaSelected: boolean = false;

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
        console.log(this.myMangaReadVolumes);
      });
  }

  setMyMangaReadVolumes(mangaVol: MangaVolume) {
    this.userService.setMyReadVolumesForManga(mangaVol).subscribe();
  }

  getMyMangas(): void {
    this.userService.getMyMangas().subscribe((response) => {
      this.myMangas = response;
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
    this.clickedVolumes = [];

    this.userService
      .getMyReadVolumesForManga(manga.id)
      .subscribe((response: any) => {
        this.myMangaReadVolumes = response;
        console.log(this.myMangaReadVolumes);
        for (let i = 0; i < response.length; i++) {
          const currentVol = response[i];
          this.clickedVolumes.push(currentVol.volNumber);
          console.log(currentVol);
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
    this.setMyMangaReadVolumes({ mangaId, volNumber });
  }
}
