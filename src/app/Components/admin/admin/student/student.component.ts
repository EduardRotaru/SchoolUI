import { Component, OnInit } from "@angular/core";
import { StudentService } from "src/app/Services/Student.service";
import { Student } from "src/app/Models/Student";

@Component({
  selector: "app-student",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.scss"],
})
export class StudentComponent implements OnInit {
  students: Student[];
  isNewForm: boolean;
  studentForm: boolean;

  newStudent: Student;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.getStudents();
    this.newStudent = new Student();
  }

  getStudents(): void {
    this.studentService.getStudents().subscribe((students) => {
      this.students = students;
    });
  }

  saveStudent(student: Student) {
    if (this.isNewForm) {
      this.studentService
        .addStudent(student)
        .subscribe((_) => this.getStudents());
    } else {
      this.studentService.putStudent(student).subscribe();
    }

    this.studentForm = false;
  }

  deleteStudent(student: Student) {
    this.students = this.students.filter((j) => j !== student);
    this.studentService.deleteStudent(student).subscribe();
  }

  showAddForm() {
    if (this.students.length) {
      this.newStudent = new Student();
    }

    this.isNewForm = true;
    this.studentForm = !this.studentForm;
  }

  showEditForm(student: Student, content) {
    if (!student) {
      this.studentForm = false;
      return;
    }

    this.studentForm = true;
    this.isNewForm = false;
    this.newStudent = student;
  }
}
