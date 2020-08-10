import { Component, OnInit } from "@angular/core";
import { TeacherService } from "../../../../Services/teacher.service";
import { Teacher } from "src/app/Models/Teacher";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PersonBirthDate } from "src/app/Models/PersonBirthDate";
import { SubjectService } from "src/app/Services/Subject.service";
import { Subject } from "src/app/Models/Subject";

@Component({
  selector: "app-teacher",
  templateUrl: "./teacher.component.html",
  styleUrls: ["./teacher.component.scss"],
})
export class TeacherComponent implements OnInit {
  teachers = [];
  newTeacher: Teacher;
  teacherForm: boolean;
  isNewForm: boolean;

  selectedValue: Subject;
  subjects: Subject[];

  constructor(
    private TeacherService: TeacherService,
    private subjectService: SubjectService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getTeachers();
    this.getSubjects();
  }

  getSubjects(): void {
    this.subjectService.getSubjects().subscribe((subjects) => {
      this.subjects = subjects;
    });
  }

  getTeachers(): void {
    this.TeacherService.getTeachers().subscribe((teachers) => {
      this.teachers = teachers;
    });
  }

  saveTeacher(teacher: Teacher) {
    let date = this.dateBuilderToCSharp(teacher.NgbBirthdate);
    teacher.BirthDate = date;

    if (this.isNewForm) {
      this.TeacherService.addTeacher(teacher).subscribe((_) =>
        this.getTeachers()
      );
    } else {
      this.TeacherService.putTeacher(teacher).subscribe();
    }

    this.modalService.dismissAll();
    this.teacherForm = false;
  }

  deleteTeacher(teacher: Teacher) {
    this.teachers = this.teachers.filter((j) => j !== teacher);
    this.TeacherService.deleteTeacher(teacher).subscribe();
  }

  openAddEmployee(content) {
    this.modalService.open(content, { size: "sm", centered: true });

    if (this.teachers.length) {
      this.newTeacher = new Teacher();
    }
    this.teacherForm = true;
    this.isNewForm = true;
  }

  openEditEmployee(teacher: Teacher, content) {
    this.modalService.open(content, { size: "sm", centered: true });

    let date = this.getDateInDatePickerFormat(teacher.BirthDate);
    teacher.NgbBirthdate = date;

    this.selectedValue = teacher.Subject;

    if (!teacher) {
      this.teacherForm = false;
      return;
    }

    this.teacherForm = true;
    this.isNewForm = false;
    this.newTeacher = teacher;
  }

  getDateInDatePickerFormat(date: string): PersonBirthDate {
    let d = new Date(date).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    var personDate = new PersonBirthDate();
    var dArr = d.split("/");

    personDate.month = +dArr[0];
    personDate.day = +dArr[1];
    personDate.year = +dArr[2];

    return personDate;
  }

  dateBuilderToCSharp(date: PersonBirthDate): string {
    let day = date.month;
    let month = date.day;
    let year = date.year;

    return `${day}/${month}/${year}`;
  }
}
