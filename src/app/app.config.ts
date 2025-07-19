import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withHashLocation,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { loadingInterceptor } from './core/interceptor/loading/loading.interceptor';
import { setHeaderInterceptor } from './core/interceptor/Header/set-header.interceptor';
import { catchErrorInterceptor } from './core/interceptor/error/catch-error.interceptor';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideRouter(
      routes,
      withHashLocation(),
      withViewTransitions(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' })
    ),

    provideHttpClient(
      withFetch(),
      withInterceptors([setHeaderInterceptor, loadingInterceptor])
    ),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    importProvidersFrom(SweetAlert2Module.forRoot(), BrowserAnimationsModule),
    provideToastr(),
  ],
};
