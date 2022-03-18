import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatRippleModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSelectModule } from "@angular/material/select";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDialogModule } from "@angular/material/dialog";
import { AgregarUsuarioComponent } from "app/agregar-usuario/agregar-usuario.component";
import { ListarUsuariosComponent } from "app/listar-usuarios/listar-usuarios.component";
import { EditarUsuarioComponent } from "app/editar-usuario/editar-usuario.component";

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(AdminLayoutRoutes),
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatRippleModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatTooltipModule,
		MatProgressSpinnerModule,
		MatAutocompleteModule,
		MatDialogModule,
	],
	declarations: [
		AgregarUsuarioComponent,
		ListarUsuariosComponent,
		EditarUsuarioComponent,
	],
})
export class AdminLayoutModule {}
