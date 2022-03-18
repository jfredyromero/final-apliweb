import { Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from "app/service/login.service";
@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"],
})
export class LoginComponent {
	error: string;
	isLoading: boolean;
	constructor(private service: LoginService, private router: Router) {
		this.error = this.router.getCurrentNavigation().extras.state?.error;
	}
	form: FormGroup = new FormGroup({
		username: new FormControl(""),
		password: new FormControl(""),
	});

	submit() {
		this.isLoading = true;
		if (this.form.valid) {
			this.service
				.validar(
					this.form.get("username").value,
					this.form.get("password").value
				)
				.subscribe(
					(res: any) => {
						if (res) {
							sessionStorage.setItem("user", JSON.stringify(res));
							this.router.navigate(["/libros"]);
						} else {
							this.error = "Credenciales Inválidas";
							this.form.reset();
						}
					},
					(err: Error) => {
						console.log(err.message);
					},
					() => {
						this.isLoading = false;
					}
				);
		}
	}
}
