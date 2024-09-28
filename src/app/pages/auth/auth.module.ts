import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { AuthRoutingModule } from "./auth-routing.module";
import { MatButtonModule } from "@angular/material/button";


@NgModule({
    declarations: [
        LoginComponent,
        RegistrationComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule
    ]
})
export class AuthModule { }