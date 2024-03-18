import { TestBed } from '@angular/core/testing';

import { MymangaService } from './mymanga.service';

describe('MymangaService', () => {
  let service: MymangaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MymangaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
