import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCredentialsComponent } from './profile-credentials.component';

describe('ProfileCredentialsComponent', () => {
  let component: ProfileCredentialsComponent;
  let fixture: ComponentFixture<ProfileCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCredentialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
