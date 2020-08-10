import { Component, OnInit } from "@angular/core";
import { User } from "../../../Models/user.model";
import { NgForm } from "@angular/forms";
import { UserService, Roles } from "../../../Services/user.service";
import { ToastrService } from "ngx-toastr";
import { SubjectService } from "src/app/Services/Subject.service";
import { Subject } from "src/app/Models/Subject";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"],
})
export class SignUpComponent implements OnInit {
  user: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
  roles: any[];
  selectedRole: Roles;
  subjects: Subject[];
  visibleForTeachers: boolean;
  visibleForStudents: boolean;

  constructor(
    private userService: UserService,
    private subjectService: SubjectService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.resetForm();
    this.userService.getAllRoles().subscribe((data: any) => {
      data.forEach((obj) => (obj.selected = false));
      this.roles = data;
    });
  }

  resetForm(form?: NgForm) {
    if (form != null) form.reset();
    this.user = {
      UserName: "",
      Password: "",
      Email: "",
      FirstName: "",
      LastName: "",
      Subject: "",
      TeacherCode: "",
      StudentCode: "",
    };

    if (this.roles) this.roles.map((x) => (x.selected = false));
  }

  OnSubmit(form: NgForm) {
    this.userService
      .registerUser(form.value, this.selectedRole.toString())
      .subscribe((data: any) => {
        if (data.Succeeded == true) {
          this.resetForm(form);
          this.router.navigate(["/login"]);
          this.toastr.success("User registration successful");
        } else {
          this.toastr.error(data.Errors[0]);
        }
      });
  }

  updateSelectedRoles(index) {
    this.roles[index].selected = !this.roles[index].selected;
  }

  changeSelectedRole(value) {
    this.selectedRole = value - 2;
    if (Roles.Teacher == this.selectedRole) {
      this.getSubjects();
      this.visibleForTeachers = true;
      this.visibleForStudents = false;
    } else {
      this.visibleForTeachers = false;
      this.visibleForStudents = true;
      this.user.TeacherCode = "";
      this.user.StudentCode = "";
      this.user.Subject = "";
    }
  }

  getSubjects(): void {
    this.subjectService.getSubjects().subscribe((subjects) => {
      this.subjects = subjects;
    });
  }
}
