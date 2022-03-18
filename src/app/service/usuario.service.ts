import { Injectable } from "@angular/core";
import { Usuario } from "app/models/Usuario";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class UsuarioService {
	private usuariosSimulados = [
		{
			cedula: "1002970732",
			nombre: "Jhon Fredy",
			apellido: "Romero Nuñez",
			pais: "Colombia",
			salario: 60000,
		},
		{
			cedula: "1002970733",
			nombre: "Lina Virginia",
			apellido: "Muñoz Garcés",
			pais: "Austria",
			salario: 80000,
		},
		{
			cedula: "1002970734",
			nombre: "Daniel Fernando",
			apellido: "Puliche Cañas",
			pais: "Perú",
			salario: 45000,
		},
		{
			cedula: "1002970735",
			nombre: "Laura Sofia",
			apellido: "Daza Daza",
			pais: "Inglaterra",
			salario: 120000,
		},
		{
			cedula: "1002970736",
			nombre: "Juan David",
			apellido: "Solarte Marain",
			pais: "Argentina",
			salario: 90000,
		},
	];
	constructor() {}

	getUsuarios(): Observable<any[]> {
		return new Observable((observer) => {
			setTimeout(() => {
				observer.next(this.usuariosSimulados);
				observer.complete();
			}, 2000);
		});
	}

	addUsuario(usuario: Usuario): Observable<boolean> {
		return new Observable((observer) => {
			setTimeout(() => {
				this.usuariosSimulados.push(usuario);
				observer.next(true);
				observer.complete();
			}, 2000);
		});
	}

	editUsuario(usuario: Usuario, index: number): Observable<boolean> {
		return new Observable((observer) => {
			setTimeout(() => {
				this.usuariosSimulados[index] = usuario;
				observer.next(true);
				observer.complete();
			}, 2000);
		});
	}

	removeUsuario(index: number): Observable<boolean> {
		return new Observable((observer) => {
			setTimeout(() => {
				this.usuariosSimulados.splice(index, 1);
				observer.next(true);
				observer.complete();
			}, 1000);
		});
	}
}
