import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { FooterComponent } from './Feature/layouts/footer/footer.component';
import { NavbarComponent } from './Feature/layouts/navbar/navbar.component';
import { NgxSpinnerModule } from 'ngx-spinner';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NavbarComponent, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'templetangularproject19';

  constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  toTop() {
    scrollTo(0, 0);
  }
  hide: boolean = false;
  @HostListener('window:scroll') totop() {
    let sscrollTop = document.documentElement.scrollTop;
    if (sscrollTop > 500) {
      this.hide = false;
    } else {
      this.hide = true;
    }
  }
}
