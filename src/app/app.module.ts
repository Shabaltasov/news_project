import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NewsTileComponent } from './components/news-tile/news-tile.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { DateFormatPipe } from './pipes/date-format.pipe';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    NewsTileComponent,
    SearchbarComponent,
    MainPageComponent,
    DateFormatPipe,
    DetailPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  bootstrap: [AppComponent],
  providers: [
    provideAnimationsAsync()
  ]
})
export class AppModule { }
