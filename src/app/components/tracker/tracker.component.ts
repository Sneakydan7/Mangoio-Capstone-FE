import { Component, OnInit, Renderer2 } from '@angular/core';
import { MymangaService } from 'src/app/services/mymanga.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss'],
})
export class TrackerComponent implements OnInit {
  myMangas!: any[];
  loggedUser!: any;
  displayMangaName!: string;
  displayMangaVolumes!: number;
  displayMangaImage!: string;
  isMangaSelected: boolean = false;

  imagePath: string = '../../../assets/images/PngItem_635378.png';

  audio!: HTMLAudioElement;

  constructor(
    private myMangaService: MymangaService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.audio = new Audio(
      '34T6PkrBW3jQjhYnpdxv8qMiiuXscEMoYasigAhYRms6DWnYCKZ6dDYujNHfBWDv6o1fL1SfJbCreRwiyG1i4iKbpBKxZiMLPzbW9vMBhRaew3nBCVS1eaGF1'
    );
  }

  ngOnInit(): void {
    this.getMe();
    this.getMyMangas();
  }
  getMe() {
    this.userService.getMe().subscribe((response: any) => {
      this.loggedUser = response;
    });
  }

  getMyMangas(): void {
    this.userService.getMyMangas().subscribe((response: any) => {
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

  generateVolumeArray(): number[] {
    return Array.from(
      { length: this.displayMangaVolumes },
      (_, index) => index + 1
    );
  }

  showSide() {
    this.isMangaSelected = true;
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
}
