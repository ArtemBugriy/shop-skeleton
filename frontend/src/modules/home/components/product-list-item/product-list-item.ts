import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProductInterface } from '@shared/interfaces/product.interface';

@Component({
  selector: 'app-product-list-item',
  imports: [],
  templateUrl: './product-list-item.html',
  styleUrl: './product-list-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListItem {
  public item = input.required<ProductInterface>();
}
