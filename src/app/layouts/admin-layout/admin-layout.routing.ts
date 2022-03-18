import { Routes } from "@angular/router";

import { ListarUsuariosComponent } from "app/listar-usuarios/listar-usuarios.component";
import { AgregarUsuarioComponent } from "app/agregar-usuario/agregar-usuario.component";

export const AdminLayoutRoutes: Routes = [
	{ path: "", redirectTo: "listar", pathMatch: "full" },
	{
		path: "listar",
		component: ListarUsuariosComponent,
	},
	{
		path: "agregar",
		component: AgregarUsuarioComponent,
	},
];
