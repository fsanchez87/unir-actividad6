import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  formUser: FormGroup;
  submitted: boolean = false;
  updateUser: boolean = false;
  myUser!: User;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.formUser = new FormGroup({
      first_name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      last_name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
      ]),
      image: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
        ),
      ]),
    });
  }

  ngOnInit(): void {
    // check if update user or new user
    this.activateRoute.params.subscribe((params: any) => {
      // Update user
      if (params.id) {
        this.updateUser = true;

        this.usersService.getById(params.id).subscribe((data: any) => {
          this.myUser = data;

          this.formUser = new FormGroup({
            first_name: new FormControl(this.myUser.first_name, [
              Validators.required,
              Validators.minLength(4),
            ]),
            last_name: new FormControl(this.myUser.last_name, [
              Validators.required,
              Validators.minLength(4),
            ]),
            email: new FormControl(this.myUser.email, [
              Validators.required,
              Validators.email,
            ]),
            image: new FormControl(this.myUser.image, [
              Validators.required,
              Validators.pattern(
                /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
              ),
            ]),
            id: new FormControl(this.myUser.id, []),
          });
        });
      }
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formUser.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.formUser.invalid) {
      return;
    }

    let newUser = this.formUser.value;
    // update user
    if (newUser.id) {
      try {
        this.usersService.update(newUser).subscribe((data: any) => {
          Swal.fire(
            'Usuario actualizado!',
            JSON.stringify(data, null, 9),
            'success'
          );
          this.router.navigate(['/home']);
        });
      } catch (error) {
        let errorMessage: any = error;
        Swal.fire('Error!', errorMessage, 'error');
      }
    }
    // create new user
    else {
      try {
        this.usersService.create(newUser).subscribe((data: any) => {
          Swal.fire(
            'Usuario creado!',
            JSON.stringify(data, null, 9),
            'success'
          );
          this.router.navigate(['/home']);
        });
      } catch (error) {
        let errorMessage: any = error;
        Swal.fire('Error!', errorMessage, 'error');
      }
    }
  }
}
