import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllContactsComponent } from './all-contacts.component';

describe('AllContactsComponent', () => {
  let component: AllContactsComponent;
  let fixture: ComponentFixture<AllContactsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllContactsComponent]
    });
    fixture = TestBed.createComponent(AllContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
