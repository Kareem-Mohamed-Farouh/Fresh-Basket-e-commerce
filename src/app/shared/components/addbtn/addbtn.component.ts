import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-addbtn',
  imports: [],
  templateUrl: './addbtn.component.html',
  styleUrl: './addbtn.component.scss',
})
export class AddbtnComponent {
  @Input() label: string = 'add to cart';
}
