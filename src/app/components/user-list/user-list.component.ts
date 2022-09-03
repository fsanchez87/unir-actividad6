import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  dataAPI: any;
  arrUsers: User[] = [];
  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    // Load the user list
    this.usersService.getAll().subscribe({
      next: (data: any) => {
        this.arrUsers = data.data;
        this.dataAPI = data;
      },
      error: (error: any) => {
        this.router.navigate(['**'], { queryParams: { error: error.message } });
      },
    });
  }

  page(nPage: number): void {
    try {
      this.usersService.getAll(nPage).subscribe((data: any) => {
        this.arrUsers = data.data;
        this.dataAPI = data;
      });
    } catch (errors: any) {
      console.log(errors.message);
    }
  }
}
