import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflix-kp.herokuapp.com/';
//get token from localStorage
const token = localStorage.getItem('token');
//get username from localStorage
const username = localStorage.getItem('Username');
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
//injecting the HttpClient module to the constructor params
// will provide HttpClient to the entire class, making it available via this.http
  constructor (private http: HttpClient) { }

  //User registration (public service)
  public userRegistration (userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  //User login (public service)
  public userLogin (userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }
 //get all movies
  getAllMovies (): Observable<any> {
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //get a single movie by movieId
  getMovie (mId: string): Observable<any> {
    return this.http.get(apiUrl + `movies/test/${mId}`, {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //get a director by name
  getDirector (name: string): Observable<any> {
    return this.http.get(apiUrl + `movies/directors/${name}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //get a genre by title
  getGenre (title: string): Observable<any> {
    return this.http.get(apiUrl + `movies/genres/${title}`, {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //get a user by username
  getUser (): Observable<any> {
    return this.http.get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //add a movie to user's favorites
  addMovieToFav (mId: string): Observable<any> {
    return this.http.post(apiUrl + `users/${username}/movies/${mId}`, {}, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
      responseType: 'text'
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }

  //delete a movie from user's favorites
  delMovieFromFav (mId: string): Observable<any> {
    return this.http.delete(apiUrl + `users/${username}/movies/${mId}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
      responseType: 'text'
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }

  //edit user's credentials
  editUser (userDetails: any): Observable<any> {
    console.log(userDetails);
      return this.http.put(apiUrl + `users/${username}`, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError));
  }

  //delete a user's account
  delUser (): Observable<any> {
    return this.http.delete(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }

  //non-typed response extraction
  private extractResponseData (res: Response | Object): any {
    const body = res;
    return body || {};
  }

  private handleError (error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred: ' + error.error.message);
    } else {
      console.log(error.error);
      console.error(
        `Error status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
