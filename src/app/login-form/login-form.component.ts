import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { FetchApiDataService } from 'src/app/fetch-api-data.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  /**
   * Inputs  of login form component
   */
  @Input() userData = { Username: '', Password: '' };

  /**
   * Creates an instance of login form component by dependency injection
   * @param fetchApiData
   * @param dialogRef | reference to the dialog opened by [[welcome]]
   * @param snackBar
   * @param router
   */
  constructor (
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router) { }

  ngOnInit(): void {
  }

  // sending form inputs to the backend
  /**
   * sends API login request
   * on success:
   * - save username, user, token to localStorage
   * - redirect to /movies route
   */
  loginUser (): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      this.dialogRef.close(); // close dialog on successful login
      console.log(result);
      localStorage.setItem('Username', this.userData.Username);
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      this.snackBar.open(`Welcome back ${this.userData.Username}`, undefined,  { duration: 3000 });
      this.router.navigate(['movies']);
    }, (error) => {
      console.log(error);
      this.snackBar.open(`This combination of Username and Password does not exist. Please try again or sign up.`, undefined, { duration: 3000 });
    });
  }

}
