import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from 'src/app/fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';

import { SynopsisComponent } from 'src/app/synopsis/synopsis.component';
import { GenreComponent } from 'src/app/genre/genre.component';
import { DirectorComponent } from 'src/app/director/director.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  user: any = '';
  favMovies: any[] = [];

  constructor (
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) { }

  ngOnInit (): void {
    this.getMovies();
    this.getUser();
  }

  getMovies (): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
  getUser (): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      this.favMovies = this.user.FavoriteMovies;
      console.log(this.favMovies);
      return this.favMovies;
    });
  }

  isFav (mId: string): boolean {
    return this.favMovies.includes(mId);
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
  openDirector (name: string, bio: string, birth: Date): void {
    this.dialog.open(DirectorComponent, {
      data: { name, bio, birth },
      width: '80vw'
    });
  }
}
