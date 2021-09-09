import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  // sending form inputs to the backend
  registerUser (): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      // TODO: Logic for successful user registration goes here
      this.dialogRef.close(); // closes the modal on success
      console.log(result);
      this.snackBar.open(`${this.userData.Username} was successfully registered.`, 'OK', { duration: 3000 });
    }, (result) => {
      this.snackBar.open(result, 'OK', { duration: 3000 });
    });
  }

}
