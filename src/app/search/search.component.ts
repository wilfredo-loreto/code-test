import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '../rest.service';
import { NgxSpinnerService } from 'ngx-spinner';
import data from './../../../api_key';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  public searchResultsData: any;
  constructor(
    private route: ActivatedRoute,
    private RestService: RestService,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: any) => {
      const { params } = paramMap;
      console.log(params.keywords);
      this.loadData(params.keywords);
    });
    this.spinnerService.show();
  }
  loadData(keywords: string) {
    this.RestService.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${data.API_KEY}&query=${keywords}`
    ).subscribe(
      (respuesta) => {
        this.searchResultsData = respuesta;
        this.spinnerService.hide();
      },
      (err) => {
        this.spinnerService.hide();
        alert(`Error during Http request: ${err}`);
      }
    );
  }
}
