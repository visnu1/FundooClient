import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";

const routes: Routes = [
    {
        path: 'signin',
        component: LoginComponent,
        children: []
    },
    {
        path: 'signup',
        component: RegistrationComponent
    },
    {
        path: 'forgotPassword',
        component: ForgotPasswordComponent
    },
    {
        path: 'resetPassword',
        component: ResetPasswordComponent
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }