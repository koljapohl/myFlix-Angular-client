import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from 'src/app/fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';

import { SynopsisComponent } from 'src/app/synopsis/synopsis.component';
import { GenreComponent } from 'src/app/genre/genre.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor (
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) { }

  ngOnInit (): void {
    this.getMovies();
  }

  getMovies (): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openSynopsis (synopsis: string): void {
    this.dialog.open(SynopsisComponent, {
      data: { synopsis },
      width: '50vw'
    });
  }
  openGenre (title: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: { title, description },
      width: '50vw'
    });
  }
}
