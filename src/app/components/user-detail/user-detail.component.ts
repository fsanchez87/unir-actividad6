import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  myUser!: User | any;
  constructor(
    private usersService: UsersService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params: any) => {
      let id: number = parseInt(params.id);
      this.usersService.getById(id).subscribe((data: any) => {
        this.myUser = data;
      });
    });
  }

  alertConfirmation() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-secondary me-3 ',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: `¿Deseas borrar el usuario ${this.myUser.first_name} ${this.myUser.last_name} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          try {
            this.usersService.delete(this.myUser.id).subscribe((data: any) => {
              if (data.id) {
                swalWithBootstrapButtons.fire(
                  'Usuario borrado!',
                  JSON.stringify(data, null, 9),
                  'success'
                );
              } else {
                swalWithBootstrapButtons.fire(
                  'CancError',
                  `${data.error}`,
                  'error'
                  );
                }
                this.router.navigate(['/home']);
            });
          } catch (error: any) {
            console.log(error.message);
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'El usuario no ha sido borrado',
            'error'
          );
        }
      });
  }
}
