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

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
