import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticsliderComponent } from './staticslider.component';

describe('StaticsliderComponent', () => {
  let component: StaticsliderComponent;
  let fixture: ComponentFixture<StaticsliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaticsliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaticsliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
