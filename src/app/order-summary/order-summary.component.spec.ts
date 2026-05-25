import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSummaryComponent } from './order-summary.component';
import { CommonModule } from '@angular/common';
import { Order } from '../order/order.component';

describe('OrderSummaryComponent', () => {

  let component: OrderSummaryComponent;
  let fixture: ComponentFixture<OrderSummaryComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        OrderSummaryComponent,
        CommonModule
      ]
    })
    .compileComponents();

    fixture =
      TestBed.createComponent(OrderSummaryComponent);

    component = fixture.componentInstance;

    const mockOrder = {
      orderId: 999,
      tacos: [
        {
          id: 3,
          name: 'Al Pastor',
          price: 2.5,
          quantity: 2
        },
        {
          id: 1,
          name: 'Carnitas',
          price: 3,
          quantity: 1,
          noOnions: true
        }
      ]
    };

    component.order = mockOrder;

    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });

  it('should calculate total price correctly', () => {

    const mockOrder: Order = {
      orderId: 1000,
      tacos: [
        {
          id: 1,
          name: 'Carnitas',
          price: 3,
          quantity: 2
        },
        {
          id: 3,
          name: 'Al Pastor',
          price: 2.5,
          quantity: 1
        }
      ]
    };

    component.order = mockOrder;

    expect(component.getTotal()).toEqual(8.5);
  });

  it('should display message for empty order', () => {

    component.order = {
      orderId: 1001,
      tacos: []
    };

    fixture.detectChanges();

    const compiled = fixture.nativeElement;

    expect(
      compiled.querySelector('p').textContent
    ).toContain(
      'No tacos added to the order yet.'
    );
  });

  it('should display details for each taco in the order', () => {

    const mockOrder: Order = {
      orderId: 1002,
      tacos: [
        {
          id: 1,
          name: 'Carnitas',
          price: 3,
          quantity: 2
        },
        {
          id: 3,
          name: 'Al Pastor',
          price: 2.5,
          quantity: 1
        }
      ]
    };

    component.order = mockOrder;

    fixture.detectChanges();

    const compiled = fixture.nativeElement;

    expect(compiled.textContent)
      .toContain('Carnitas');

    expect(compiled.textContent)
      .toContain('Quantity:');

    expect(compiled.textContent)
      .toContain('Unit Price:');
  });

  it('should calculate the total using taco quantity values', () => {

    component.order = {
      orderId: 2001,
      tacos: [
        {
          id: 1,
          name: 'Carnitas Taco',
          price: 3.25,
          quantity: 2
        },
        {
          id: 2,
          name: 'Queso Birria Taco',
          price: 3.50,
          quantity: 3
        }
      ]
    };

    expect(component.getTotal()).toBe(17.0);
  });

  it('should render the first taco using the expected summary label format', () => {

    component.order = {
      orderId: 2002,
      tacos: [
        {
          id: 1,
          name: 'Carnitas Taco',
          price: 3.25,
          quantity: 2
        }
      ]
    };

    fixture.detectChanges();

    const compiled = fixture.nativeElement;

    expect(compiled.textContent)
      .toContain('Item 1');

    expect(compiled.textContent)
      .toContain('Carnitas Taco');
  });

  it('UPDATED CONTRACT: displays structured line item formatting', () => {

    component.order = {
      orderId: 3001,
      tacos: [
        {
          id: 1,
          name: 'Carnitas Taco',
          price: 3.25,
          quantity: 2
        }
      ]
    };

    fixture.detectChanges();

    const compiled =
      fixture.nativeElement as HTMLElement;

    expect(compiled.textContent)
      .toContain('Item 1');

    expect(compiled.textContent)
      .toContain('Quantity:');
  });

  it('UPDATED CONTRACT: displays unit price wording', () => {

    component.order = {
      orderId: 3002,
      tacos: [
        {
          id: 1,
          name: 'Carnitas Taco',
          price: 3.25,
          quantity: 1
        }
      ]
    };

    fixture.detectChanges();

    const compiled =
      fixture.nativeElement as HTMLElement;

    expect(compiled.textContent)
      .toContain('Unit Price:');
  });

  it('UPDATED CONTRACT: renders remove taco buttons', () => {

    component.order = {
      orderId: 3003,
      tacos: [
        {
          id: 1,
          name: 'Carnitas Taco',
          price: 3.25,
          quantity: 1
        }
      ]
    };

    fixture.detectChanges();

    const compiled =
      fixture.nativeElement as HTMLElement;

    const buttons =
      Array.from(
        compiled.querySelectorAll('button')
      );

    expect(buttons.length)
      .toBeGreaterThan(0);
  });

  it('UPDATED CONTRACT: uses generated item identifiers', () => {

    component.order = {
      orderId: 3004,
      tacos: [
        {
          id: 1,
          name: 'Carnitas Taco',
          price: 3.25,
          quantity: 1
        },
        {
          id: 2,
          name: 'Queso Birria Taco',
          price: 3.50,
          quantity: 1
        }
      ]
    };

    fixture.detectChanges();

    const compiled =
      fixture.nativeElement as HTMLElement;

    const text =
      compiled.textContent ?? '';

    expect(text)
      .toContain('Item 1');

    expect(text)
      .toContain('Item 2');
  });

});
