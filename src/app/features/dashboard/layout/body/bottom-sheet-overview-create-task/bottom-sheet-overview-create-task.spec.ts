import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetOverviewCreateTask } from './bottom-sheet-overview-create-task';

describe('BottomSheetOverviewCreateTask', () => {
  let component: BottomSheetOverviewCreateTask;
  let fixture: ComponentFixture<BottomSheetOverviewCreateTask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomSheetOverviewCreateTask]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomSheetOverviewCreateTask);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
