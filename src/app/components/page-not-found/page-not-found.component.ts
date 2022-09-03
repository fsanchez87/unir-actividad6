import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
})
export class PageNotFoundComponent implements OnInit {
  errorMessage: string = '';
  constructor(private activateRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((params: any) => {
      if (params.error) {
        this.errorMessage = params.error;
      } else {
        this.errorMessage = '404 - Página no encontrada';
      }
    });
  }
}
