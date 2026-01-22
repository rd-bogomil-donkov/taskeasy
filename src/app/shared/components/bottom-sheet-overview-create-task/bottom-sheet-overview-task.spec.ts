import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetOverviewTask } from './bottom-sheet-overview-task';

describe('BottomSheetOverviewCreateTask', () => {
  let component: BottomSheetOverviewTask;
  let fixture: ComponentFixture<BottomSheetOverviewTask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomSheetOverviewTask]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomSheetOverviewTask);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
