import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudBar } from './crud-bar';
import { provideZonelessChangeDetection } from '@angular/core';

describe('CrudBar', () => {
  let component: CrudBar;
  let fixture: ComponentFixture<CrudBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudBar],
      providers: [provideZonelessChangeDetection()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
