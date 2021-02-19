import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MovieSchema } from './../models/movie.model';
import { addMovie, deleteMovie } from './favorites.actions';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  movies$: Observable<any>;
  public movies = [];
  public peliculasActuales = [];
  public encontrarPelicula = true;
  constructor(private store: Store<{ movies: Array<MovieSchema> }>) {
    this.store.subscribe((state) => {
      this.saveGlobalState(state);
    });
  }

  ngOnInit(): void {
    this.movies$ = this.store.select('movies');

    this.peliculasActuales = JSON.parse(localStorage.getItem('movies'));
    if (this.peliculasActuales != null) {
      if (this.peliculasActuales[0] != null && this.movies.length > 0) {
        this.peliculasActuales.map((peliActual, i) => {
          this.encontrarPelicula = true;
          this.movies.map((movie) => {
            if (peliActual.id == movie.id) {
              this.encontrarPelicula = false;
            }
          });
          if (this.encontrarPelicula) {
            this.addMovie(peliActual);
          }
        });
      } else if (this.peliculasActuales[0] != null) {
        this.peliculasActuales.map((elem) => {
          this.addMovie(elem);
        });
      }
    }
  }

  addMovie(movie: MovieSchema) {
    this.store.dispatch(addMovie({ MovieSchema: movie }));
  }

  deleteMovie(id: number) {
    this.store.dispatch(deleteMovie({ id: id }));

    localStorage.removeItem('movies');
    localStorage.setItem('movies', JSON.stringify(this.movies));
  }

  saveGlobalState(state) {
    this.movies = state.movies;

    this.peliculasActuales = JSON.parse(localStorage.getItem('movies'));
    if (this.peliculasActuales == null || this.peliculasActuales[0] == null) {
      this.peliculasActuales = this.movies;
    } else {
      this.movies.map((elem, iterator1) => {
        this.encontrarPelicula = true;
        this.peliculasActuales.map((elemActuales, iterator2) => {
          if (elemActuales.id == elem.id) {
            this.encontrarPelicula = false;
          }
        });
        if (this.encontrarPelicula) {
          this.peliculasActuales.push(elem);
        }
      });
    }
    localStorage.setItem('movies', JSON.stringify(this.peliculasActuales));
  }
}
