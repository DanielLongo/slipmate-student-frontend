import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PassesComponent } from './passes/passes.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {from} from 'rxjs';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatOptionModule,
  MatSelectModule,
  MatStepperModule,
  MatToolbarModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatMenuModule, MatDividerModule
} from '@angular/material';
import { CreatePassComponent } from './create-pass/create-pass.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthServiceConfig, GoogleLoginProvider, SocialLoginModule} from "angularx-social-login";

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('133453041482-ebq2hge5thtmvklqe9i35s25q6b1gc85.apps.googleusercontent.com')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    PassesComponent,
    CreatePassComponent,
  ],
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatButtonModule,
    BrowserModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatToolbarModule,
    SocialLoginModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatDividerModule
  ],
  providers: [
    MatDatepickerModule,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
],
  bootstrap: [AppComponent]
})

export class AppModule { }
