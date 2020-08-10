import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TeacherComponent } from "./Components/admin/admin/teacher/teacher.component";
import { SubjectComponent } from "./Components/admin/admin/subject/subject.component";
import { StudentComponent } from "./Components/admin/admin/student/student.component";
import { SignUpComponent } from "./Components/user/sign-up/sign-up.component";
import { HomeComponent } from "./Components/home/home.component";
import { UserComponent } from "./Components/user/user.component";
import { SignInComponent } from "./Components/user/sign-in/sign-in.component";
import { AuthGuard } from "./Components/auth/auth.guard";
import { AppComponent } from "./app.component";
// import { AnonymousGuard } from "./Components/auth/anonymouse-guard";
import { AdminComponent } from "./Components/admin/admin/admin.component";

const routes: Routes = [
  // {
  //   path: "homepage",
  //   component: AppComponent,
  //   children: [
  //     { path: "", redirectTo: "/", pathMatch: "full" },
  //     { path: "teacher", component: TeacherComponent, outlet: "tch" },
  //     { path: "student", component: StudentComponent, outlet: "std" },
  //     { path: "subject", component: SubjectComponent, outlet: "sbj" },
  //   ],
  // },

  {
    path: "teacher",
    component: TeacherComponent,
  },
  { path: "student", component: StudentComponent },

  // { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  // {
  //   path: "signup",
  //   component: UserComponent,
  //   children: [{ path: "", component: SignUpComponent }],
  // },
  // {
  //   path: "login",
  //   component: UserComponent,
  //   children: [{ path: "", component: SignInComponent }],
  // },
  // { path: "", redirectTo: "homepage", pathMatch: "full" },

  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Administrator"] },
  },
  // { path: 'forbidden', component: ForbiddenComponent, canActivate: [AuthGuard] },
  // { path: 'adminPanel', component: AdminPanelComponent, canActivate: [AuthGuard] , data: { roles: ['Admin'] }},
  {
    path: "signup",
    component: UserComponent,
    children: [{ path: "", component: SignUpComponent }],
  },
  {
    path: "login",
    component: UserComponent,
    children: [{ path: "", component: SignInComponent }],
  },
  { path: "", redirectTo: "/login", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
