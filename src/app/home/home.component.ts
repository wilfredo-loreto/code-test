import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { RestService } from '../rest.service';
import data from './../../../api_key';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public toptrendingMovie: any;
  public trendingMovies: any;
  public tvPopular: any;
  public topRatedMovies: any;
  public indexMovies: number = 0;
  public endMovies: number = 3;
  public indexSeries: number = 0;
  public endSeries: number = 3;
  public hideElements: Array<string> = [];
  constructor(private RestService: RestService) {}

  ngOnInit(): void {
    this.loadData();
    let j = 0;
    let carouselMovies = [];
    let carouselSeries = [];
    let hideElements = [];
    for (j = 0; j <= 9; j++) {
      carouselMovies[j] = 'movies' + j;
      carouselSeries[j] = 'series' + j;
    }

    for (j = 0; j <= 3; j++) {
      hideElements[j] = document.getElementById(`${carouselMovies[j]}`);
    }
    console.log(hideElements);
    console.log(carouselMovies);
  }
  moveRight(index: number, type: string): void {
    console.log(type + index);
    if (index <= 8) {
      if (type == 'movies') {
        this.endMovies += 1;
        let showCard = document.getElementById(type + this.indexMovies);
        let hideCard = document.getElementById(type + this.endMovies);
        showCard.classList.toggle('hide');
        hideCard.classList.toggle('hide');
        console.log(showCard);
        this.indexMovies += 1;
      } else {
        this.endSeries += 1;
        let showCard = document.getElementById(type + this.indexSeries);
        let hideCard = document.getElementById(type + this.endSeries);
        showCard.classList.toggle('hide');
        hideCard.classList.toggle('hide');
        console.log(showCard);
        this.indexSeries += 1;
      }
    }
  }
  moveLeft(index: number, type: string): void {
    if (index > 0) {
      if (type == 'movies') {
        this.indexMovies -= 1;
        let showCard = document.getElementById(type + this.indexMovies);
        let hideCard = document.getElementById(type + this.endMovies);
        showCard.classList.toggle('hide');
        hideCard.classList.toggle('hide');
        console.log(showCard);
        this.endMovies -= 1;
      } else {
        this.indexSeries -= 1;
        let showCard = document.getElementById(type + this.indexSeries);
        let hideCard = document.getElementById(type + this.endSeries);
        showCard.classList.toggle('hide');
        hideCard.classList.toggle('hide');
        console.log(showCard);
        this.endSeries -= 1;
      }
    }
    console.log(index + type);
  }
  loadData() {
    forkJoin([
      this.RestService.get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${data.API_KEY}`
      ),
      this.RestService.get(
        `https://api.themoviedb.org/3/tv/popular?api_key=${data.API_KEY}`
      ),
      this.RestService.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${data.API_KEY}`
      ),
    ]).subscribe(([resTrendingMovies, resTvPopular, resTopRatedMovies]) => {
      this.trendingMovies = resTrendingMovies;
      this.tvPopular = resTvPopular;
      this.topRatedMovies = resTopRatedMovies;
    });
  }
}
