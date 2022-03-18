import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";
import { AppComponent } from "./app.component";
import { MatCardModule } from "@angular/material/card";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { LoginComponent } from "./login/login.component";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
	imports: [
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		ComponentsModule,
		RouterModule,
		AppRoutingModule,
		MatCardModule,
		MatInputModule,
		MatButtonModule,
		MatProgressSpinnerModule,
	],
	declarations: [AppComponent, AdminLayoutComponent, LoginComponent],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
