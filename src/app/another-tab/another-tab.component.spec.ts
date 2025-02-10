import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotherTabComponent } from './another-tab.component';

describe('AnotherTabComponent', () => {
  let component: AnotherTabComponent;
  let fixture: ComponentFixture<AnotherTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnotherTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnotherTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
