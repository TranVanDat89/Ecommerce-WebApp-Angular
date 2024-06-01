import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerLicense } from '@syncfusion/ej2-base';

import { AppModule } from './app/app.module';
registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF1cXmhPYVRpR2Nbe05xdF9FaVZTRWY/P1ZhSXxXdkBgWH1cc31XR2VUVEc=');


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
