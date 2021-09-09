import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FetchApiDataService } from 'src/app/fetch-api-data.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor (
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  // sending form inputs to the backend
  loginUser (): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      this.dialogRef.close(); // close dialog on successful login
      console.log(result);
      this.snackBar.open(`Welcome back ${this.userData.Username}!`, 'Thanks!', { duration: 3000 });
      localStorage.setItem('Username', this.userData.Username);
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'Got it!', { duration: 3000 });
    });
  }

}
