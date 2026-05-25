import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Order } from '../order/order.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule],

  template: `

    <h1>Order Summary</h1>

    @if (order.tacos.length > 0) {

      <div
        class="line-item"
        *ngFor="let taco of order.tacos; let i = index">

        <h3>
          Item {{ i + 1 }}
        </h3>

        <p>
          <strong>Taco:</strong>
          {{ taco.name }}
        </p>

        <p>
          <strong>Quantity:</strong>
          {{ taco.quantity }}
        </p>

        <p>
          <strong>Unit Price:</strong>
          {{ taco.price | currency:'USD':'symbol':'1.2-2' }}
        </p>

        <p>
          <strong>Line Subtotal:</strong>
          {{ getLineSubtotal(taco) | currency:'USD':'symbol':'1.2-2' }}
        </p>

        @if (taco.noOnions || taco.noCilantro) {

          <div>

            <strong>
              Customizations:
            </strong>

            <ul>

              @if (taco.noOnions) {
                <li>No onions</li>
              }

              @if (taco.noCilantro) {
                <li>No cilantro</li>
              }

            </ul>

          </div>

        }

        <button
  type="button"
  (click)="onRemove(i)">

  Remove Taco

</button>

        <hr />

      </div>

      <p>
        <strong>Total:</strong>
        {{ getTotal() | currency:'USD':'symbol':'1.2-2' }}
      </p>

    } @else {

      <p>
        No tacos added to the order yet.
      </p>

    }

  `,
  styles: [`
    .line-item {
      border: 1px solid #ccc;
      padding: 10px;
      margin-bottom: 10px;
    }

    button {
      margin-top: 10px;
    }
  `]
})

export class OrderSummaryComponent {

  @Input()
  order!: Order;

  @Output()
  removeTaco = new EventEmitter<number>();

  getTotal() {

    return this.order.tacos.reduce(
      (acc, taco) =>
        acc + (taco.price * (taco.quantity ?? 1)),
      0
    );
  }

  getLineSubtotal(taco: any): number {

    return taco.price * (taco.quantity ?? 1);
  }

  onRemove(index: number): void {

    this.removeTaco.emit(index);
  }
}
