import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetOverviewTask } from './bottom-sheet-overview-task';
import { provideZonelessChangeDetection } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

describe('BottomSheetOverviewCreateTask', () => {
  let component: BottomSheetOverviewTask;
  let fixture: ComponentFixture<BottomSheetOverviewTask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomSheetOverviewTask],
      providers: [provideZonelessChangeDetection(),
      { provide: MatBottomSheetRef, useValue: { dismiss: jasmine.createSpy('dismiss') } },
      { provide: MAT_BOTTOM_SHEET_DATA, useValue: { task: { id: 1, title: 'Test' } } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BottomSheetOverviewTask);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
