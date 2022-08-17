import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
  @Input() myUser!: User;
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {}

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
                  `${data.first_name} ${data.last_name}`,
                  'success'
                );
              } else {
                swalWithBootstrapButtons.fire(
                  'Error',
                  `${data.error}`,
                  'error'
                );
              }
            });
          } catch (error: any) {
            console.log(error.message);
          }
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'El usuario no ha sido borrado',
            'error'
          );
        }
      });
  }
}
