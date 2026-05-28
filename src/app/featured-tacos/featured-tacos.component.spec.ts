import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedTacosComponent } from './featured-tacos.component';

describe('FeaturedTacosComponent', () => {
  let component: FeaturedTacosComponent;
  let fixture: ComponentFixture<FeaturedTacosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedTacosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedTacosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
