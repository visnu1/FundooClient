import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteLabelsComponent } from './note-labels.component';

describe('NoteLabelsComponent', () => {
  let component: NoteLabelsComponent;
  let fixture: ComponentFixture<NoteLabelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteLabelsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoteLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
