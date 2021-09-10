import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UserRegistrationFormComponent } from 'src/app/user-registration-form/user-registration-form.component';
import { LoginFormComponent } from 'src/app/login-form/login-form.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
    // opens the dialog for registering after the according button has been clicked
    openUserRegistrationDialog (): void {
      this.dialog.open(UserRegistrationFormComponent, { width: '280px' });
    }
    // opens the dialog for logging in after the according button has been clicked
    openLoginDialog (): void {
      this.dialog.open(LoginFormComponent, { width: '280px' });
    }

}
