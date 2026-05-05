import { bootstrapApplication } from '@angular/platform-browser';
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { environment } from './environments/environment';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

const firebaseApp = initializeApp(environment.firebase);
isSupported().then((ok) => { if (ok) getAnalytics(firebaseApp); });

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
