import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  routeToMovies (): void {
    this.router.navigate(['movies']);
  }
  routeToProfile (): void {
    this.router.navigate(['profile']);
  }
  signOut (): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}
