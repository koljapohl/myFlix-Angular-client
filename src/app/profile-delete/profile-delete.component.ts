import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

import { FetchApiDataService } from 'src/app/fetch-api-data.service';

@Component({
  selector: 'app-profile-delete',
  templateUrl: './profile-delete.component.html',
  styleUrls: ['./profile-delete.component.scss']
})
export class ProfileDeleteComponent implements OnInit {

  constructor (
    public router: Router,
    public dialogRef: MatDialogRef<ProfileDeleteComponent>,
    public fetchApiData: FetchApiDataService
  ) { }

  ngOnInit(): void {
  }

  deleteAccount (): void {
    this.fetchApiData.delUser().subscribe((resp) => {
      console.log(resp);
      this.dialogRef.close();
      this.router.navigate(['welcome']);
    });
  }
}
