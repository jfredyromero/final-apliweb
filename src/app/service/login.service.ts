import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class LoginService {
	private administradoresSimulados = [
		{
			nombre: "Jhon Fredy",
			username: "jfredyromero@test.com",
			password: "pass1234",
		},
		{
			nombre: "Lina Muñoz",
			username: "linavm@test.com",
			password: "pass1234",
		},
		{
			nombre: "Javier Hurtado",
			username: "javhur@test.com",
			password: "pass1234",
		},
	];
	constructor() {}

	validar(username: string, password: string): Observable<any> {
		return new Observable((observer) => {
			setTimeout(() => {
				this.administradoresSimulados
					.filter((admin) => admin.username == username)
					.filter((admin) => admin.password == password).length == 1
					? observer.next(
							this.administradoresSimulados
								.filter((admin) => admin.username == username)
								.filter((admin) => admin.password == password)
								.pop()
					  )
					: observer.next(null);
				observer.complete();
			}, 2000);
		});
	}
}
