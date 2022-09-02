import { Component, OnInit } from '@angular/core';
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
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    // Load the user list
    try {
      this.usersService.getAll().subscribe((data: any) => {
        this.arrUsers = data.data;
        this.dataAPI = data;
      });
    } catch (error: any) {
      console.log(error.message);
    }
  }

  page(nPage: number): void {
    try {
      this.usersService.getAll(nPage).subscribe((data: any) => {
        this.arrUsers = data.data;
        this.dataAPI = data;
      });
      console.log('page finished');
    } catch (errors: any) {
      console.log(errors.message);
    }
  }
}
