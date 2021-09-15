import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * @constant string apiUrl
 * @constant string JWTtoken from localStorage
 * @constant string username from localStorage
 */
const apiUrl = 'https://myflix-kp.herokuapp.com/';
const token = localStorage.getItem('token');
const username = localStorage.getItem('Username');

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  /**
   * Creates an instance of fetch api data service.
   * @param http angular's HttpClient module
   */
  constructor (private http: HttpClient) { }

  /**
   * Users registration
   * @param userDetails
   * @returns registration
   */
  public userRegistration (userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Users login
   * @param userDetails
   * @returns login
   */
  public userLogin (userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Gets all movies
   * @constant token
   * @returns all movies
   */
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

  /**
   * Gets single movie by its Id
   * @param mId
   * @returns movie
   */
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

  /**
   * Gets director by its name
   * @param name
   * @returns director
   */
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

  /**
   * Gets genre by its title
   * @param title
   * @returns genre
   */
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

  /**
   * Gets user by its username
   * @returns user
   */
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

  /**
   * Adds movie to user's favorites
   * @param mId
   * @returns movie to favorites
   */
  addMovieToFav (mId: string): Observable<any> {
    return this.http.post(apiUrl + `users/${username}/movies/${mId}`, {}, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
      responseType: 'text'
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError));
  }

  /**
   * Deletes movie from user's favorites
   * @param mId
   * @returns rm movie from favorites
   */
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

  /**
   * Edits user
   * @param userDetails
   * @returns new user credentials
   */
  editUser (userDetails: any): Observable<any> {
      return this.http.put(apiUrl + `users/${username}`, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError));
  }

  /**
   * Deletes user account
   * @returns status message
   */
  delUser (): Observable<any> {
    return this.http.delete(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
      responseType: 'text'
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }

  /**
   * Extracts response data
   * @param res
   * @returns response data
   */
  private extractResponseData (res: Response | Object): Object | Response {
    const body = res;
    return body || {};
  }

  /**
   * Handles Http Error Responses
   * @param error
   * @returns error
   */
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
