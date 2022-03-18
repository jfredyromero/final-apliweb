import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Libro } from "app/models/Libro";
import { LibroService } from "app/service/libro.service";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
declare var $: any;
@Component({
	selector: "app-editar-libro",
	templateUrl: "./editar-libro.component.html",
	styleUrls: ["./editar-libro.component.css"],
})
export class EditarLibroComponent implements OnInit {
	libro: Libro;
	index: number;
	isLoading: boolean;
	libroForm: FormGroup;
	constructor(
		private service: LibroService,
		private dialogRef: MatDialogRef<EditarLibroComponent>,
		private router: Router,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}
	ngOnInit() {
		const credenciales = sessionStorage.getItem("user");
		if (!credenciales) {
			this.router.navigate(["/login"], {
				state: { error: "Credenciales Inválidas" },
			});
		}
		this.libro = new Libro();
		this.libro = this.data.user;
		this.index = this.data.index;
		this.buildForm();
	}

	buildForm() {
		this.libroForm = new FormGroup({
			titulo: new FormControl(this.libro.titulo, Validators.required),
			autor: new FormControl(this.libro.autor, Validators.required),
			ISBN: new FormControl(this.libro.ISBN, Validators.required),
			numeroPaginas: new FormControl(
				this.libro.numeroPaginas,
				Validators.required
			),
			editorial: new FormControl(
				this.libro.editorial,
				Validators.required
			),
			fechaPublicacion: new FormControl(
				this.libro.fechaPublicacion,
				Validators.required
			),
		});
	}

	onSubmit() {
		if (this.libroForm.valid) {
			this.libro.titulo = this.libroForm.get("titulo").value;
			this.libro.autor = this.libroForm.get("autor").value;
			this.libro.ISBN = this.libroForm.get("ISBN").value;
			this.libro.numeroPaginas =
				this.libroForm.get("numeroPaginas").value;
			this.libro.editorial = this.libroForm.get("editorial").value;
			this.libro.fechaPublicacion =
				this.libroForm.get("fechaPublicacion").value;
			this.isLoading = true;
			this.service.editLibro(this.libro, this.index).subscribe(
				(res: boolean) => {
					res
						? this.showNotification(
								"Libro actualizado de forma exitosa!",
								"success"
						  )
						: this.showNotification(
								"Error al actualizar libro",
								"danger"
						  );
				},
				(err: Error) => {
					console.log(err.message);
				},
				() => {
					this.dialogRef.close();
					this.isLoading = false;
				}
			);
		} else {
			this.showNotification(
				"Por favor llene todos los campos...",
				"danger"
			);
		}
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
