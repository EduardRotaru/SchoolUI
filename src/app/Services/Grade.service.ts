import { Injectable } from " ../../../node_modules/@angular/core";
import {
  HttpClient,
  HttpHeaders,
} from " ../../../node_modules/@angular/common/http";
import { Observable } from " ../../../node_modules/rxjs";
import { Student } from "../Models/Student";
import { Grades } from "../Models/Grades";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class GradeService {
  constructor(private http: HttpClient) {}

  private gradeUrl = "http://localhost:53190/api/grades";
  private gradesURL = "http://localhost:53190/api/grades/GetGradesByTeacher";
  private gradesStudentURL =
    "http://localhost:53190/api/grades/GetGradesByStudent";

  getGrades(): Observable<Grades[]> {
    return this.http.get<Grades[]>(this.gradeUrl);
  }

  getGradesByTeacher(
    teacherId: number,
    studentId: number
  ): Observable<Grades[]> {
    const url = `${this.gradesURL}/${teacherId}/${studentId}`;

    return this.http.get<Grades[]>(url, httpOptions);
  }

  getGradesByStudent(studentId: number): Observable<Grades[]> {
    const url = `${this.gradesStudentURL}/${studentId}`;

    return this.http.get<Grades[]>(url, httpOptions);
  }

  addGrade(grade: Grades): Observable<Grades> {
    return this.http.post<Grades>(this.gradeUrl, grade, httpOptions);
  }
}
