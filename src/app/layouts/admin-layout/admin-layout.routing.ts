import { Routes } from "@angular/router";

import { ListarLibrosComponent } from "app/listar-libros/listar-libros.component";
import { AgregarLibroComponent } from "app/agregar-libro/agregar-libro.component";

export const AdminLayoutRoutes: Routes = [
	{ path: "", redirectTo: "listar", pathMatch: "full" },
	{
		path: "listar",
		component: ListarLibrosComponent,
	},
	{
		path: "agregar",
		component: AgregarLibroComponent,
	},
];
