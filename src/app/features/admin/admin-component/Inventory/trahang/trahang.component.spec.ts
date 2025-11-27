import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrahangComponent } from './trahang.component';

describe('TrahangComponent', () => {
  let component: TrahangComponent;
  let fixture: ComponentFixture<TrahangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrahangComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrahangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
