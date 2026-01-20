import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudBar } from './crud-bar';

describe('CrudBar', () => {
  let component: CrudBar;
  let fixture: ComponentFixture<CrudBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudBar]
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
