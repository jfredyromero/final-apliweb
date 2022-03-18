import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Libro } from "app/models/Libro";
import { LibroService } from "app/service/libro.service";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
declare var $: any;
@Component({
	selector: "app-agregar-libro",
	templateUrl: "./agregar-libro.component.html",
	styleUrls: ["./agregar-libro.component.css"],
})
export class AgregarLibroComponent implements OnInit {
	isLoading: boolean;
	libro: Libro;
	libroForm: FormGroup;
	credenciales: any;
	constructor(private service: LibroService, private router: Router) {}
	ngOnInit() {
		const credenciales = sessionStorage.getItem("user");
		if (!credenciales) {
			this.router.navigate(["/login"], {
				state: { error: "Credenciales Inválidas" },
			});
		} else {
			this.getCredenciales();
			this.buildForm();
		}
	}

	getCredenciales() {
		this.credenciales = JSON.parse(sessionStorage.getItem("user"));
	}

	buildForm() {
		this.libroForm = new FormGroup({
			titulo: new FormControl("", Validators.required),
			autor: new FormControl("", Validators.required),
			ISBN: new FormControl("", Validators.required),
			numeroPaginas: new FormControl("", Validators.required),
			editorial: new FormControl("", Validators.required),
			fechaPublicacion: new FormControl("", Validators.required),
		});
	}

	onSubmit() {
		if (this.libroForm.valid) {
			this.libro = new Libro();
			this.libro.titulo = this.libroForm.get("titulo").value;
			this.libro.autor = this.libroForm.get("autor").value;
			this.libro.ISBN = this.libroForm.get("ISBN").value;
			this.libro.numeroPaginas =
				this.libroForm.get("numeroPaginas").value;
			this.libro.editorial = this.libroForm.get("editorial").value;
			this.libro.fechaPublicacion =
				this.libroForm.get("fechaPublicacion").value;
			this.libro.fechaRegistro = new Date();
			this.isLoading = true;
			this.service.addLibro(this.libro).subscribe(
				(res: boolean) => {
					res
						? this.showNotification(
								"Libro agregado de forma exitosa!",
								"success"
						  )
						: this.showNotification(
								"Error al agregar libro",
								"danger"
						  );
				},
				(err: Error) => {
					console.log(err.message);
				},
				() => {
					this.buildForm();
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
