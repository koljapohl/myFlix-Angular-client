import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from 'src/app/fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit (): void {
    if (localStorage["token"]) {
      this.getUser();
    } else {
      window.location.reload();
    }
  }

  getMovies (): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }
  getUser (): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      this.favMovies = this.user.FavoriteMovies;
      this.getMovies();
      return this.favMovies;
    });
  }

  isFav (mId: string): boolean {
    return this.favMovies.includes(mId);
  }

  toggleFavMovie (mId: string): void {
    this.isFav(mId) ?
      this.fetchApiData.delMovieFromFav(mId).subscribe(() => {
        const mTitle = this.getMovieTitle(mId);
        this.favMovies.splice(this.favMovies.indexOf(mId), 1);
        this.snackBar.open(`${mTitle} was removed from your list of favorites`, undefined, { duration: 3000 });
      }) :
      this.fetchApiData.addMovieToFav(mId).subscribe(() => {
        const mTitle = this.getMovieTitle(mId);
        this.favMovies.push(mId);
        this.snackBar.open(`${mTitle} was added to your favorite's list`, undefined, { duration: 3000 });
      });
  }

  private getMovieTitle (mId: string): string {
    const element = this.movies.filter(el => el._id === mId);
    return element[0]?.Title;
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
