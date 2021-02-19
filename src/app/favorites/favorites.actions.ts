import { createAction, props } from '@ngrx/store';
import { MovieSchema } from './../models/movie.model';

//Acciones para aplicar al State
export const addMovie = createAction(
  '[Favorites Component] Add',
  props<{ MovieSchema }>()
);
export const deleteMovie = createAction(
  '[Favorites Component] Del',
  props<{ id }>()
);
