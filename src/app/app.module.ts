import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BarComponent } from './shared/components/bar/bar.component';

const modules = [BrowserModule, AppRoutingModule, BrowserAnimationsModule];
const components = [BarComponent];

@NgModule({
  declarations: [AppComponent],
  imports: [modules, components],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
