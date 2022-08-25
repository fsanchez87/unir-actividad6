import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  formUser: FormGroup;
  submitted: boolean = false;
  updateUser: boolean = false;

  constructor(
    private userService: UsersService,
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
      if(params.id){
        this.updateUser = true;
      }
    })
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



    // display form values on success
    console.log(
      'SUCCESS!! :-)\n\n' + JSON.stringify(this.formUser.value, null, 4)
    );
  }
}
