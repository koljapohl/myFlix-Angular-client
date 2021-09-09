import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UserRegistrationFormComponent } from 'src/app/user-registration-form/user-registration-form.component';
import { LoginFormComponent } from 'src/app/login-form/login-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Angular-client';

  constructor (public dialog: MatDialog) { }
  // opens the dialog for registering after the according button has been clicked
  openUserRegistrationDialog (): void {
    this.dialog.open(UserRegistrationFormComponent, { width: '280px' });
  }
  openLoginDialog (): void {
    this.dialog.open(LoginFormComponent, { width: '280px' });
  }
}
