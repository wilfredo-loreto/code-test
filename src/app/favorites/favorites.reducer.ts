import { Action, createReducer, on } from '@ngrx/store';
import { addMovie, deleteMovie } from './favorites.actions';
import { MovieSchema } from './../models/movie.model';

export interface AppState {
  movies: Array<MovieSchema>;
}
export const initialState: Array<MovieSchema> = [];

const _movieReducer = createReducer(
  initialState,
  on(deleteMovie, (state, { id }) => state.filter((Movie) => Movie.id !== id)),
  on(addMovie, (state, { MovieSchema }) => {
    return [...state, MovieSchema];
  })
);

export function movieReducer(state, action: Action) {
  return _movieReducer(state, action);
}
