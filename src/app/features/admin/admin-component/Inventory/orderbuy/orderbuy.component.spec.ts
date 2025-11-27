import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderbuyComponent } from './orderbuy.component';

describe('OrderbuyComponent', () => {
  let component: OrderbuyComponent;
  let fixture: ComponentFixture<OrderbuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderbuyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderbuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
