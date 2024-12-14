import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAnalytics, provideAnalytics, ScreenTrackingService } from '@angular/fire/analytics';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"my-firebase-app-c3161","appId":"1:449377769575:web:7054fda9705a0f51229cc2","storageBucket":"my-firebase-app-c3161.firebasestorage.app","apiKey":"AIzaSyDd8A3H0MiYG0tOh6ztdeDLWVHFwXaxt2g","authDomain":"my-firebase-app-c3161.firebaseapp.com","messagingSenderId":"449377769575"})), provideAnalytics(() => getAnalytics()), ScreenTrackingService]
};
