import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MovieSchema } from '../models/movie.model';
import { RestService } from '../rest.service';
import { addMovie } from './../favorites/favorites.actions';
import data from './../../../api_key';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent {
  public movie = {};
  public newMovie = {};
  public moviesInLocalStorage = [];
  public band = true;
  public movieData: any;
  movies$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private RestService: RestService,
    private store: Store<{ movies: Array<MovieSchema> }>,
    private router: Router,
    private location: Location
  ) {
    this.route.paramMap.subscribe((paramMap: any) => {
      const { params } = paramMap;
      console.log(params.id);
      this.loadData(params.id);
    });
  }

  datesMovie(movie) {
    let newMovie: MovieSchema = {
      id: movie.id,
      title: movie.title,
      poster: movie.poster_path,
      date: movie.release_date,
    };

    this.addMovie(newMovie);
  }

  addMovie(movie: MovieSchema) {
    this.moviesInLocalStorage = JSON.parse(localStorage.getItem('movies'));
    if (this.moviesInLocalStorage != null) {
      this.moviesInLocalStorage.map((elem) => {
        if (movie.id == elem.id) {
          this.band = false;
        }
      });
    }

    if (this.band == true) {
      this.store.dispatch(addMovie({ MovieSchema: movie }));
    }

    this.router.navigate(['/favorites']);
  }
  loadData(id: string) {
    this.RestService.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${data.API_KEY}`
    ).subscribe((respuesta) => {
      this.movieData = respuesta;
    });
  }
  backPage(): void {
    this.location.back();
  }
}
