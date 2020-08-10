import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../../Services/user.service";
import { TeacherService } from "src/app/Services/teacher.service";
import { Teacher } from "src/app/Models/Teacher";
import { Subject } from "src/app/Models/Subject";
import { Student } from "src/app/Models/Student";
import { StudentService } from "src/app/Services/Student.service";
import { Grades } from "src/app/Models/Grades";
import { GradeService } from "src/app/Services/Grade.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  userClaims: any;
  teacherSubject: Subject;
  teacher: Teacher;
  students: Student[];

  isNewForm: boolean;
  gradeForm: boolean;
  visibleGrades: boolean;

  newGrade: Grades;
  grades: Grades[];
  studentName: string;
  showAllStudents: boolean;

  constructor(
    private router: Router,
    private userService: UserService,
    private teacherService: TeacherService,
    private studentService: StudentService,
    private gradeService: GradeService
  ) {}

  ngOnInit() {
    this.userService.getUserClaims().subscribe((data: any) => {
      this.userClaims = data;

      if (this.userService.roleMatch(["Teacher"])) {
        this.teacherService
          .getTeacher(this.userClaims.ID)
          .subscribe((teacher) => {
            this.teacherSubject = teacher.Subject;
            this.teacher = teacher;
          });
        this.studentService.getStudents().subscribe((students) => {
          this.students = students;
          if (this.students.length > 0) {
            this.showAllStudents = true;
          }
        });
      }

      if (this.userService.roleMatch(["Student"])) {
        this.gradeService
          .getGradesByStudent(this.userClaims.ID)
          .subscribe((grades) => {
            this.grades = grades;
            this.visibleGrades = true;
          });
      }
    });

    this.newGrade = new Grades();
  }

  Logout() {
    localStorage.removeItem("userToken");
    this.router.navigate(["/login"]);
  }

  showGiveGrade(user: any) {
    this.studentName = `${user.FirstName} ${user.LastName}`;

    this.newGrade.Student = user.Student;
    this.newGrade.Teacher = this.teacher;
    this.newGrade.Subject = this.teacherSubject;
    this.newGrade.Date = new Date().toLocaleDateString();

    this.isNewForm = true;
    this.gradeForm = !this.gradeForm;

    this.GetGradesByTeacherAndStudent(user.Student.ID, this.teacher.ID);
  }

  saveGrades(grade: Grades) {
    this.gradeService.addGrade(grade).subscribe((_) =>
      this.gradeService
        .getGradesByTeacher(this.teacher.ID, grade.Student.ID)
        .subscribe((g) => {
          this.grades = g;
        })
    );

    this.resetForm();
    this.gradeForm = !this.gradeForm;
  }

  showGrades(user: any) {
    this.studentName = `${user.FirstName} ${user.LastName} grades`;
    this.GetGradesByTeacherAndStudent(user.Student.ID, this.teacher.ID);
  }

  private GetGradesByTeacherAndStudent(studentId: number, teacherId: number) {
    this.gradeService
      .getGradesByTeacher(teacherId, studentId)
      .subscribe((grades) => {
        this.grades = grades;
        this.showAllStudents = !this.showAllStudents;
        this.visibleGrades = !this.visibleGrades;
      });
  }

  showStudents() {
    this.showAllStudents = !this.showAllStudents;
    this.visibleGrades = !this.visibleGrades;
    this.gradeForm = false;
  }

  resetForm() {
    this.newGrade.Grade = undefined;
    this.newGrade.Commentary = "";
    this.newGrade.Evaluation = "";
  }
}
