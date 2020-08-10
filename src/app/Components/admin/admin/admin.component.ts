import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit {
  showStudentsList: boolean;
  showTeachersList: boolean;
  showSubjectsList: boolean;

  constructor() {}

  ngOnInit() {
    this.showStudentsList = true;
  }

  showStudents() {
    this.showStudentsList = true;
    this.showTeachersList = false;
    this.showSubjectsList = false;
  }

  showTeachers() {
    this.showStudentsList = false;
    this.showTeachersList = true;
    this.showSubjectsList = false;
  }

  showSubjects() {
    this.showStudentsList = false;
    this.showTeachersList = false;
    this.showSubjectsList = true;
  }
}
