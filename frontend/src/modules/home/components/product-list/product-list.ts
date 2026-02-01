import { ChangeDetectionStrategy, Component } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { ProductListItem } from '../product-list-item/product-list-item';
import { ProductInterface } from '@shared/interfaces/product.interface';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-product-list',
  imports: [ProductListItem],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductList {
  public readonly productList = httpResource<ProductInterface[]>(() => ({
    url: `${environment.apiUrl}/product`,
    method: 'GET',
  }));
}
