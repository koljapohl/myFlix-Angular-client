import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { FetchApiDataService } from 'src/app/fetch-api-data.service';
import { ProfileDeleteComponent } from 'src/app/profile-delete/profile-delete.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  user: any = {};
  movies: any[] = [];
  favIds: any[] = [];
  favMovies: any[] = [];

  constructor (
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  getUser (): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      this.getMovies();
    });
  }

  getMovies (): void {
    this.fetchApiData.getAllMovies().subscribe((resp) => {
      this.movies = resp;
      console.log(this.movies);
      this.getFavMovies();
    })
  }

  getFavMovies (): void {
    this.favIds = this.user.FavoriteMovies;
    console.log(this.favIds);
    this.favMovies = this.movies.filter(movie => this.favIds.includes(movie._id));
    console.log(this.favMovies);
  }

  ngOnInit (): void {
    this.getUser();
  }

  unfavMovie (mId: string): void {
    this.fetchApiData.delMovieFromFav(mId).subscribe(() => {
      const mTitle = this.getMovieTitle(mId);
      this.favMovies.splice(this.favMovies.indexOf(mId), 1);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      this.snackBar.open(`${mTitle} was removed from your list of favorites`, undefined, { duration: 2000 });
    });
  }

  openDelete (): void {
    this.dialog.open(ProfileDeleteComponent, { width: '50vw' });
  }

  private getMovieTitle (mId: string): string {
    const element = this.movies.filter(el => el._id === mId);
    return element[0]?.Title;
  }
}
