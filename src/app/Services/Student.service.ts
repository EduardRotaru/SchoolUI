import { Injectable } from " ../../../node_modules/@angular/core";
import {
  HttpClient,
  HttpHeaders,
} from " ../../../node_modules/@angular/common/http";
import { Observable } from " ../../../node_modules/rxjs";
import { Student } from "../Models/Student";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class StudentService {
  constructor(private http: HttpClient) {}

  private studentUrl = "http://localhost:53190/api/student";

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentUrl);
  }

  getStudent(id: number): Observable<Student> {
    const url = `${this.studentUrl}/${id}`;

    return this.http.get<Student>(url);
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.studentUrl, student, httpOptions);
  }

  putStudent(student: any | number): Observable<any> {
    const id = typeof student === "number" ? student : student.Id;
    const url = `${this.studentUrl}/${id}`;

    return this.http.put(url, student, httpOptions);
  }

  deleteStudent(student: any | number): Observable<Student> {
    const id = typeof student === "number" ? student : student.Id;
    const url = `${this.studentUrl}/${id}`;

    return this.http.delete<Student>(url, httpOptions);
  }
}
