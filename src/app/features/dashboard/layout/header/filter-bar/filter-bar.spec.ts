import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterBar } from './filter-bar';
import { provideZonelessChangeDetection } from '@angular/core';

describe('FilterBar', () => {
  let component: FilterBar;
  let fixture: ComponentFixture<FilterBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterBar],
      providers: [provideZonelessChangeDetection()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
