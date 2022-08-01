import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvamWebPortalComponent } from './tvam-web-portal.component';

describe('TvamWebPortalComponent', () => {
  let component: TvamWebPortalComponent;
  let fixture: ComponentFixture<TvamWebPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvamWebPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvamWebPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
