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
  MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatNativeDateModule, MatOptionModule, MatSelectModule, MatStepperModule, MatToolbarModule, MatChipsModule, MatAutocompleteModule
} from '@angular/material';
import { CreatePassComponent } from './create-pass/create-pass.component';
import {ReactiveFormsModule} from '@angular/forms';

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
    MatChipsModule,
    MatAutocompleteModule
  ],
  providers: [
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
