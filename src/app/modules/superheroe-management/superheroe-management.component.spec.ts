import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperheroeManagementComponent } from './superheroe-management.component';

describe('SuperheroeManagementComponent', () => {
  let component: SuperheroeManagementComponent;
  let fixture: ComponentFixture<SuperheroeManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperheroeManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperheroeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
