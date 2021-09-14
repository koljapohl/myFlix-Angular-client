import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FetchApiDataService } from 'src/app/fetch-api-data.service';

@Component({
  selector: 'app-profile-credentials',
  templateUrl: './profile-credentials.component.html',
  styleUrls: ['./profile-credentials.component.scss']
})
export class ProfileCredentialsComponent implements OnInit {
  @Input() newUserData = { Username: '', Password1: '', Password2: '', Email: '', Birthday: '' };

  oldPw: string = '';

  constructor (
    public dialogRef: MatDialogRef<ProfileCredentialsComponent>,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit (): void {
    this.fetchApiData.getUser().subscribe((resp) => {
      this.newUserData.Username = resp.Username;
      this.newUserData.Email = resp.Email;
      this.oldPw = resp.Password;
      resp.Birthday ? this.newUserData.Birthday = resp.Birthday.split("T")[0] : null;
    })
  }

  pwCheck (): boolean {
    return !(this.newUserData.Password1 === this.newUserData.Password2);
  }
  onUpdate (): void {
    this.fetchApiData.editUser({
      Username: this.newUserData.Username,
      Password: this.newUserData.Password1 ? this.newUserData.Password1 : this.oldPw,
      Email: this.newUserData.Email,
      Birthday: this.newUserData.Birthday
    }).subscribe(() => {
      this.snackBar.open(`Your credentials have been updated`, undefined, { duration: 3000 });
      this.dialogRef.close();
      window.location.reload();
    }, (error) => {
      console.error(error);
      this.snackBar.open(error, undefined, { duration: 4000 });
    })
  }
}
