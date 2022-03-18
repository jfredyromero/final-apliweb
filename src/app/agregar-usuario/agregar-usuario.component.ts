import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Usuario } from "app/models/Usuario";
import { UsuarioService } from "app/service/usuario.service";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
declare var $: any;
@Component({
	selector: "app-agregar-usuario",
	templateUrl: "./agregar-usuario.component.html",
	styleUrls: ["./agregar-usuario.component.css"],
})
export class AgregarUsuarioComponent implements OnInit {
	paises: string[] = [
		"Afghanistan",
		"Albania",
		"Algeria",
		"Andorra",
		"Angola",
		"Antarctica",
		"Antigua and Barbuda",
		"Argentina",
		"Armenia",
		"Australia",
		"Austria",
		"Azerbaijan",
		"Bahamas",
		"Bahrain",
		"Bangladesh",
		"Barbados",
		"Belarus",
		"Belgium",
		"Belize",
		"Benin",
		"Bermuda",
		"Bhutan",
		"Bolivia",
		"Bosnia and Herzegovina",
		"Botswana",
		"Brazil",
		"Brunei",
		"Bulgaria",
		"Burkina Faso",
		"Burma",
		"Burundi",
		"Cambodia",
		"Cameroon",
		"Canada",
		"Cape Verde",
		"Central African Republic",
		"Chad",
		"Chile",
		"China",
		"Colombia",
		"Comoros",
		"Congo, Democratic Republic",
		"Congo, Republic of the",
		"Costa Rica",
		"Cote d'Ivoire",
		"Croatia",
		"Cuba",
		"Cyprus",
		"Czech Republic",
		"Denmark",
		"Djibouti",
		"Dominica",
		"Dominican Republic",
		"East Timor",
		"Ecuador",
		"Egypt",
		"El Salvador",
		"Equatorial Guinea",
		"Eritrea",
		"Estonia",
		"Ethiopia",
		"Fiji",
		"Finland",
		"France",
		"Gabon",
		"Gambia",
		"Georgia",
		"Germany",
		"Ghana",
		"Greece",
		"Greenland",
		"Grenada",
		"Guatemala",
		"Guinea",
		"Guinea-Bissau",
		"Guyana",
		"Haiti",
		"Honduras",
		"Hong Kong",
		"Hungary",
		"Iceland",
		"India",
		"Indonesia",
		"Iran",
		"Iraq",
		"Ireland",
		"Israel",
		"Italy",
		"Jamaica",
		"Japan",
		"Jordan",
		"Kazakhstan",
		"Kenya",
		"Kiribati",
		"Korea, North",
		"Korea, South",
		"Kuwait",
		"Kyrgyzstan",
		"Laos",
		"Latvia",
		"Lebanon",
		"Lesotho",
		"Liberia",
		"Libya",
		"Liechtenstein",
		"Lithuania",
		"Luxembourg",
		"Macedonia",
		"Madagascar",
		"Malawi",
		"Malaysia",
		"Maldives",
		"Mali",
		"Malta",
		"Marshall Islands",
		"Mauritania",
		"Mauritius",
		"Mexico",
		"Micronesia",
		"Moldova",
		"Mongolia",
		"Morocco",
		"Monaco",
		"Mozambique",
		"Namibia",
		"Nauru",
		"Nepal",
		"Netherlands",
		"New Zealand",
		"Nicaragua",
		"Niger",
		"Nigeria",
		"Norway",
		"Oman",
		"Pakistan",
		"Panama",
		"Papua New Guinea",
		"Paraguay",
		"Peru",
		"Philippines",
		"Poland",
		"Portugal",
		"Qatar",
		"Romania",
		"Russia",
		"Rwanda",
		"Samoa",
		"San Marino",
		" Sao Tome",
		"Saudi Arabia",
		"Senegal",
		"Serbia and Montenegro",
		"Seychelles",
		"Sierra Leone",
		"Singapore",
		"Slovakia",
		"Slovenia",
		"Solomon Islands",
		"Somalia",
		"South Africa",
		"Spain",
		"Sri Lanka",
		"Sudan",
		"Suriname",
		"Swaziland",
		"Sweden",
		"Switzerland",
		"Syria",
		"Taiwan",
		"Tajikistan",
		"Tanzania",
		"Thailand",
		"Togo",
		"Tonga",
		"Trinidad and Tobago",
		"Tunisia",
		"Turkey",
		"Turkmenistan",
		"Uganda",
		"Ukraine",
		"United Arab Emirates",
		"United Kingdom",
		"United States",
		"Uruguay",
		"Uzbekistan",
		"Vanuatu",
		"Venezuela",
		"Vietnam",
		"Yemen",
		"Zambia",
		"Zimbabwe",
	];
	isLoading: boolean;
	filteredOptions: Observable<string[]>;
	usuario: Usuario;
	usuarioForm: FormGroup;
	credenciales: any;
	constructor(private service: UsuarioService, private router: Router) {}
	ngOnInit() {
		const credenciales = sessionStorage.getItem("user");
		if (!credenciales) {
			this.router.navigate(["/login"], {
				state: { error: "Credenciales Inválidas" },
			});
		} else {
			this.getCredenciales();
			this.buildForm();
			this.filteredOptions = this.usuarioForm
				.get("pais")
				.valueChanges.pipe(
					startWith(""),
					map((value) => this._filter(value))
				);
		}
	}

	getCredenciales() {
		this.credenciales = JSON.parse(sessionStorage.getItem("user"));
	}

	buildForm() {
		this.usuarioForm = new FormGroup({
			cedula: new FormControl("", Validators.required),
			nombre: new FormControl("", Validators.required),
			apellido: new FormControl("", Validators.required),
			pais: new FormControl("", Validators.required),
			salario: new FormControl("", Validators.required),
		});
	}

	onSubmit() {
		if (this.usuarioForm.valid) {
			this.usuario = new Usuario();
			this.usuario.cedula = this.usuarioForm.get("cedula").value;
			this.usuario.nombre = this.usuarioForm.get("nombre").value;
			this.usuario.apellido = this.usuarioForm.get("apellido").value;
			this.usuario.pais = this.usuarioForm.get("pais").value;
			this.usuario.salario = this.usuarioForm.get("salario").value;
			this.isLoading = true;
			this.service.addUsuario(this.usuario).subscribe(
				(res: boolean) => {
					res
						? this.showNotification(
								"Usuario agregado de forma exitosa!",
								"success"
						  )
						: this.showNotification(
								"Error al agregar usuario",
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

	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.paises.filter((option) =>
			option.toLowerCase().includes(filterValue)
		);
	}
}
