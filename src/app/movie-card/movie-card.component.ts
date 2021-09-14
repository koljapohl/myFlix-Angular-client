import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from 'src/app/fetch-api-data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(public fetchApiData: FetchApiDataService) { }

  ngOnInit (): void {
    this.getMovies();
  }

  getMovies (): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }
}
