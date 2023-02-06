import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperheroeSearchComponent } from './superheroe-search.component';

describe('SuperheroeSearchComponent', () => {
  let component: SuperheroeSearchComponent;
  let fixture: ComponentFixture<SuperheroeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperheroeSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperheroeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
