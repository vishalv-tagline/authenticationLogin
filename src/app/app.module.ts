import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
// import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
// import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
// import { WithGoogleAuthConfig, WithGoogleAuthModule } from 'ngx-sign-in-with-google'


@NgModule({

  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            // provider: new GoogleLoginProvider(environment.googleKey),
            provider: new GoogleLoginProvider('641756807112-gob5mojpv6g227kus78hqg8a9la9o9eo.apps.googleusercontent.com')
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            // provider: new FacebookLoginProvider(environment.facebookKey)
            provider: new FacebookLoginProvider('260955003167834')
          },
          // {
          //   provide: 'WithGoogleAuthConfig',
          //   useValue: {
          //     clientId: '641756807112-gob5mojpv6g227kus78hqg8a9la9o9eo.apps.googleusercontent.com',
          //   } as WithGoogleAuthConfig,
          // },
        ],
        onError: (err: any) => {
          console.log('error-GoogleAuth :>> ', err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
