import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import { FavoritesComponent } from './favorites/favorites.component';
import {NgxSpinnerModule} from "ngx-spinner";
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ResultCardComponent } from './result-card/result-card.component'
import { StoreModule } from '@ngrx/store';
import { movieReducer } from './favorites/favorites.reducer';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    MovieDetailComponent,
    HomeComponent,
    SearchComponent,
    FavoritesComponent,
    SearchBarComponent,
    ResultCardComponent,
  ],
  imports: [
    AppRoutingModule,
    FlexLayoutModule,
    BrowserModule,
    HttpClientModule,
    NgxSpinnerModule, 
    StoreModule.forRoot({movies:movieReducer}), 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
