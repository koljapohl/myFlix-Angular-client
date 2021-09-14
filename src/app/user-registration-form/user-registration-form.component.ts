import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { FetchApiDataService } from 'src/app/fetch-api-data.service';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor (
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  // sending form inputs to the backend
  registerUser (): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      this.dialogRef.close(); // closes the modal on success
      this.snackBar.open(`${this.userData.Username} was successfully registered.`, 'OK', { duration: 3000 });
      this.loginUser()
    }, (result) => {
      this.snackBar.open(result, undefined, { duration: 3000 });
    });
  }

  loginUser (): void {
    this.fetchApiData.userLogin({ Username: this.userData.Username, Password: this.userData.Password }).subscribe((result) => {
      localStorage.setItem('Username', this.userData.Username);
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      this.snackBar.open(`Welcome back ${this.userData.Username}`, undefined, { duration: 3000 });
      this.router.navigate(['movies']);
    }, (error) => {
      console.log(error);
    });
  }
}
