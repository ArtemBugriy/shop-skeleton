import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductList } from './components/product-list/product-list';
import { Header } from '@shared/components/header/header';
import { Footer } from '@shared/components/footer/footer';

@Component({
  selector: 'app-home',
  imports: [
    ProductList,
    Header,
    Footer
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {

}
