import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { FetchApiDataService } from 'src/app/fetch-api-data.service';
import { ProfileDeleteComponent } from 'src/app/profile-delete/profile-delete.component';
import { ProfileCredentialsComponent } from 'src/app/profile-credentials/profile-credentials.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any = {};
  movies: any[] = [];
  favIds: any[] = [];
  favMovies: any[] = [];

  constructor (
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit (): void {
    this.getUser();
  }

  getUser (): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      this.getMovies();
      this.checkBirthday();
    });
  }

  getMovies (): void {
    this.fetchApiData.getAllMovies().subscribe((resp) => {
      this.movies = resp;
      this.getFavMovies();
    })
  }

  /**
   * Stores the user's favorite movies in the class' favMovies variable
   * @returns Array of user's favorite movie objects
   */
  getFavMovies (): void {
    this.favIds = this.user.FavoriteMovies;
    this.favMovies = this.movies.filter(movie => this.favIds.includes(movie._id));
  }

  /**
   * Checks if user has set a birthday
   */
  checkBirthday (): boolean {
    return this.user.Birthday
  }

  ngOnDestroy (): void {
    this.user = {};
    this.movies = [];
    this.favIds = [];
    this.favMovies = [];
  }

  /**
   * Removes a movie from the user's favorite's list
   * @param mId
   */
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
  openChange (): void {
    this.dialog.open(ProfileCredentialsComponent, { width: '280px' });
  }

  private getMovieTitle (mId: string): string {
    const element = this.movies.filter(el => el._id === mId);
    return element[0]?.Title;
  }
}
