import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSelectModule } from "@angular/material/select";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDialogModule } from "@angular/material/dialog";
import { AgregarLibroComponent } from "app/agregar-libro/agregar-libro.component";
import { ListarLibrosComponent } from "app/listar-libros/listar-libros.component";
import { EditarLibroComponent } from "app/editar-libro/editar-libro.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";

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
		MatDatepickerModule,
		MatNativeDateModule,
	],
	declarations: [
		AgregarLibroComponent,
		ListarLibrosComponent,
		EditarLibroComponent,
	],
})
export class AdminLayoutModule {}
