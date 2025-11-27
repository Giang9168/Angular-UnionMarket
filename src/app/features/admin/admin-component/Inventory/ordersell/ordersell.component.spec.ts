import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersellComponent } from './ordersell.component';

describe('OrdersellComponent', () => {
  let component: OrdersellComponent;
  let fixture: ComponentFixture<OrdersellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
