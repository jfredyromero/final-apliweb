import { Injectable } from "@angular/core";
import { Libro } from "app/models/Libro";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class LibroService {
	private librosSimulados = [
		{
			titulo: "Cien años de soledad",
			autor: "Gabriel García Márquez",
			ISBN: "3678293046283",
			numeroPaginas: 234,
			editorial: "Norma",
			fechaPublicacion: new Date("1967-05-01"),
			fechaRegistro: new Date("2022-09-02"),
		},
		{
			titulo: "Viaje al fin de la noche",
			autor: "Louis-Ferdinand Céline",
			ISBN: "183902993472",
			numeroPaginas: 2334,
			editorial: "Norma",
			fechaPublicacion: new Date("1932-09-10"),
			fechaRegistro: new Date("2022-09-01"),
		},
		{
			titulo: "Don Quijote de la Mancha",
			autor: "Miguel de Cervantes",
			ISBN: "1188234762098",
			numeroPaginas: 2324,
			editorial: "Norma",
			fechaPublicacion: new Date("1615-01-23"),
			fechaRegistro: new Date("2010-09-01"),
		},
		{
			titulo: "Los cuentos de Canterbury",
			autor: "Geoffrey Chaucer",
			ISBN: "18376299283422",
			numeroPaginas: 1234,
			editorial: "Norma",
			fechaPublicacion: new Date("1320-11-09"),
			fechaRegistro: new Date("2019-09-12"),
		},
		{
			titulo: "Las mil y una noches",
			autor: "Anónimo",
			ISBN: "1920382736632",
			numeroPaginas: 2334,
			editorial: "Norma",
			fechaPublicacion: new Date("1500-07-27"),
			fechaRegistro: new Date("2019-09-12"),
		},
		{
			titulo: "Divina comedia",
			autor: "Dante Alighieri",
			ISBN: "0012938261538",
			numeroPaginas: 2934,
			editorial: "Norma",
			fechaPublicacion: new Date("1265-10-10"),
			fechaRegistro: new Date("2019-09-10"),
		},
		{
			titulo: "Orgullo y prejuicio",
			autor: "Jane Austen",
			ISBN: "0238273827384",
			numeroPaginas: 8234,
			editorial: "Norma",
			fechaPublicacion: new Date("1813-10-13"),
			fechaRegistro: new Date("2019-04-10"),
		},
		{
			titulo: "Ficciones",
			autor: "Jorge Luis Borges",
			ISBN: "012845273476",
			numeroPaginas: 2934,
			editorial: "Norma",
			fechaPublicacion: new Date("1944-02-19"),
			fechaRegistro: new Date("2019-04-12"),
		},
	];
	constructor() {}

	getLibros(): Observable<any[]> {
		return new Observable((observer) => {
			setTimeout(() => {
				observer.next(this.librosSimulados);
				observer.complete();
			}, 2000);
		});
	}

	addLibro(libro: Libro): Observable<boolean> {
		return new Observable((observer) => {
			setTimeout(() => {
				this.librosSimulados.push(libro);
				observer.next(true);
				observer.complete();
			}, 2000);
		});
	}

	editLibro(libro: Libro, index: number): Observable<boolean> {
		return new Observable((observer) => {
			setTimeout(() => {
				this.librosSimulados[index] = libro;
				observer.next(true);
				observer.complete();
			}, 2000);
		});
	}

	removeLibro(index: number): Observable<boolean> {
		return new Observable((observer) => {
			setTimeout(() => {
				this.librosSimulados.splice(index, 1);
				observer.next(true);
				observer.complete();
			}, 1000);
		});
	}
}
