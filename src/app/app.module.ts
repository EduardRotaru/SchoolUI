import { BrowserModule } from "@angular/platform-browser";
import { NgbModule, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TeacherComponent } from "./Components/admin/admin/teacher/teacher.component";
import { TeacherService } from "./Services/teacher.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { DateWithoutTime } from "./Pipes/DateWithoutTime";
import { SubjectComponent } from "./Components/admin/admin/subject/subject.component";
import { StudentComponent } from "./Components/admin/admin/student/student.component";
import { SubjectService } from "./Services/Subject.service";
import { StudentService } from "./Services/Student.service";
import { SearchPipe } from "./Pipes/SearchPipes";
import { SignUpComponent } from "./Components/user/sign-up/sign-up.component";
import { UserService } from "./Services/user.service";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SignInComponent } from "./Components/user/sign-in/sign-in.component";
import { HomeComponent } from "./Components/home/home.component";
import { AuthInterceptor } from "./Components/auth/auth.interceptor";
import { AuthGuard } from "./Components/auth/auth.guard";
import { UserComponent } from "./Components/user/user.component";
import { GradeService } from "./Services/Grade.service";
import { CustomFormsModule } from "ng2-validation";
import { AdminComponent } from "./Components/admin/admin/admin.component";
// import { AnonymousGuard } from "./Components/auth/anonymouse-guard";

@NgModule({
  declarations: [
    AppComponent,
    TeacherComponent,
    SubjectComponent,
    StudentComponent,
    SignUpComponent,
    SignInComponent,
    HomeComponent,
    UserComponent,
    AdminComponent,

    DateWithoutTime,
    SearchPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    CustomFormsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: "toast-bottom-right",
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    TeacherService,
    StudentService,
    SubjectService,
    UserService,
    GradeService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
