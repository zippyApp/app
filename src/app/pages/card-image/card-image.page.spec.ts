import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardImagePage } from './card-image.page';

describe('CardImagePage', () => {
  let component: CardImagePage;
  let fixture: ComponentFixture<CardImagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CardImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
