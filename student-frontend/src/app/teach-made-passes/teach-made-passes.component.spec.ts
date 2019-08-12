import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachMadePassesComponent } from './teach-made-passes.component';

describe('TeachMadePassesComponent', () => {
  let component: TeachMadePassesComponent;
  let fixture: ComponentFixture<TeachMadePassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachMadePassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachMadePassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
