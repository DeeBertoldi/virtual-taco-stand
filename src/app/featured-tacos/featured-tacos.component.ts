import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-featured-tacos',
  standalone: true,
  imports: [CommonModule],

  template: `
    <div class="featured-container">

      <h2>Featured Tacos</h2>

      <button (click)="toggleChefPick()">
        Toggle Chef's Pick
      </button>

      <div *ngIf="showChefPick" class="chef-pick">
        🌮 Chef's Pick: {{ chefPick.name }}
      </div>

      <div class="taco-card" *ngFor="let taco of tacos">

        <h3>{{ taco.name }}</h3>

        <p>{{ taco.description }}</p>

        <p><strong>Price:</strong> {{ taco.price }}</p>

        <span class="label">
          {{ taco.label }}
        </span>

      </div>

    </div>
  `,

  styles: [`
    .featured-container {
      padding: 20px;
    }

    .taco-card {
      border: 1px solid #ccc;
      padding: 15px;
      margin-bottom: 15px;
      border-radius: 8px;
    }

    .label {
      background-color: black;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
    }

    .chef-pick {
      margin-bottom: 20px;
      font-weight: bold;
      color: darkred;
    }

    button {
      margin-bottom: 20px;
    }
  `]
})

export class FeaturedTacosComponent {

  tacos = [
    {
      name: 'Birria Taco',
      description: 'Slow cooked beef with cheese',
      price: '$4.99',
      label: 'Popular'
    },

    {
      name: 'Spicy Chicken Taco',
      description: 'Hot chicken with jalapeños',
      price: '$3.99',
      label: 'Spicy'
    },

    {
      name: 'Veggie Taco',
      description: 'Fresh vegetables and avocado',
      price: '$3.49',
      label: 'New'
    },

    {
      name: 'Al Pastor Taco',
      description: 'Traditional pork taco with pineapple',
      price: '$4.49',
      label: 'Chef Favorite'
    }
  ];

  chefPick = this.tacos[0];

  showChefPick = true;

  toggleChefPick() {
    this.showChefPick = !this.showChefPick;
  }

}
