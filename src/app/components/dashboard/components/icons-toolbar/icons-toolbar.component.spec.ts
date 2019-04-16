import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsToolbarComponent } from './icons-toolbar.component';

describe('IconsToolbarComponent', () => {
  let component: IconsToolbarComponent;
  let fixture: ComponentFixture<IconsToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconsToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconsToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
