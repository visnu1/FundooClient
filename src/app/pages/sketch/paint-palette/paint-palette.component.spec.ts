import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintPaletteComponent } from './paint-palette.component';

describe('PaintPaletteComponent', () => {
  let component: PaintPaletteComponent;
  let fixture: ComponentFixture<PaintPaletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaintPaletteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaintPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
