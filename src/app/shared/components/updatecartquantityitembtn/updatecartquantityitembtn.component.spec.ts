import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecartquantityitembtnComponent } from './updatecartquantityitembtn.component';

describe('UpdatecartquantityitembtnComponent', () => {
  let component: UpdatecartquantityitembtnComponent;
  let fixture: ComponentFixture<UpdatecartquantityitembtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatecartquantityitembtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatecartquantityitembtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
