import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

declare const $: any;
declare interface RouteInfo {
	path: string;
	title: string;
	icon: string;
	class: string;
}
export const ROUTES: RouteInfo[] = [
	{
		path: "/libros/listar",
		title: "Listar Libros",
		icon: "content_paste",
		class: "",
	},
	{
		path: "/libros/agregar",
		title: "Agregar Libro",
		icon: "group_add",
		class: "",
	},
];

@Component({
	selector: "app-sidebar",
	templateUrl: "./sidebar.component.html",
	styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
	menuItems: any[];
	credenciales: any;
	constructor(private router: Router) {}

	ngOnInit() {
		this.menuItems = ROUTES.filter((menuItem) => menuItem);
		this.getCredenciales();
	}

	getCredenciales() {
		this.credenciales = JSON.parse(sessionStorage.getItem("user"));
	}

	isMobileMenu() {
		if ($(window).width() > 991) {
			return false;
		}
		return true;
	}

	cerrarSesion() {
		sessionStorage.clear();
		this.router.navigate(["/login"]);
	}
}
