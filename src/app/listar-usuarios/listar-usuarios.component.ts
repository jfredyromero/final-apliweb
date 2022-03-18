import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { EditarUsuarioComponent } from "app/editar-usuario/editar-usuario.component";
import { Usuario } from "app/models/Usuario";
import { UsuarioService } from "app/service/usuario.service";
declare var $: any;
@Component({
	selector: "app-listar-usuarios",
	templateUrl: "./listar-usuarios.component.html",
	styleUrls: ["./listar-usuarios.component.css"],
})
export class ListarUsuariosComponent implements OnInit {
	usuarios: Usuario[];
	isLoading: boolean;
	credenciales: any;
	constructor(
		private service: UsuarioService,
		private router: Router,
		public dialog: MatDialog
	) {}
	ngOnInit() {
		const credenciales = sessionStorage.getItem("user");
		if (!credenciales) {
			this.router.navigate(["/login"], {
				state: { error: "Credenciales Inválidas" },
			});
		} else {
			this.getCredenciales();
			this.showUsuarios();
		}
	}

	getCredenciales() {
		this.credenciales = JSON.parse(sessionStorage.getItem("user"));
	}

	showUsuarios() {
		this.isLoading = true;
		this.service.getUsuarios().subscribe(
			(res: Usuario[]) => {
				this.usuarios = res;
				this.usuarios = this.usuarios.reverse();
			},
			(err: Error) => {
				console.log(err.message);
			},
			() => {
				this.showNotification("Usuarios Cargados", "success");
				this.isLoading = false;
			}
		);
	}

	onRemove(index: number) {
		this.isLoading = true;
		this.service.removeUsuario(index).subscribe(
			(res: boolean) => {
				res
					? this.showNotification(
							"Usuario eliminado de forma exitosa!",
							"success"
					  )
					: this.showNotification(
							"Error al eliminar el usuario",
							"danger"
					  );
			},
			(err: Error) => {
				console.log(err.message);
			},
			() => {
				this.isLoading = false;
				this.showUsuarios;
			}
		);
	}

	onEdit(user: Usuario, index: number) {
		const dialogRef = this.dialog.open(EditarUsuarioComponent, {
			data: {
				user: user,
				index: index,
			},
		});
		dialogRef.afterClosed().subscribe((result) => {
			console.log(`Dialog result: ${result}`);
		});
	}

	private showNotification(msg: string, type: string) {
		$.notify(
			{
				icon: "notifications",
				message: msg,
			},
			{
				type: type,
				timer: 2000,
				placement: {
					from: "top",
					align: "right",
				},
				template:
					'<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
					'<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
					'<i class="material-icons" data-notify="icon">notifications</i> ' +
					'<span data-notify="title">{1}</span> ' +
					'<span data-notify="message">{2}</span>' +
					'<div class="progress" data-notify="progressbar">' +
					'<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
					"</div>" +
					'<a href="{3}" target="{4}" data-notify="url"></a>' +
					"</div>",
			}
		);
	}
}
