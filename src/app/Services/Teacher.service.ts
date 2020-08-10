import { Injectable } from " ../../../node_modules/@angular/core";
import {
  HttpClient,
  HttpHeaders,
} from " ../../../node_modules/@angular/common/http";
import { Observable } from " ../../../node_modules/rxjs";
import { Teacher } from "../Models/Teacher";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};
@Injectable({
  providedIn: "root",
})
export class TeacherService {
  constructor(private http: HttpClient) {}

  private teacherUrl = "http://localhost:53190/api/teacher";

  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.teacherUrl);
  }

  getTeacher(id: number): Observable<Teacher> {
    const url = `${this.teacherUrl}/${id}`;

    return this.http.get<Teacher>(url);
  }

  addTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(this.teacherUrl, teacher, httpOptions);
  }

  putTeacher(teacher: any | number): Observable<any> {
    const id = typeof teacher === "number" ? teacher : teacher.Id;
    const url = `${this.teacherUrl}/${id}`;

    return this.http.put(url, teacher, httpOptions);
  }

  deleteTeacher(teacher: any | number): Observable<Teacher> {
    const id = typeof teacher === "number" ? teacher : teacher.Id;
    const url = `${this.teacherUrl}/${id}`;

    return this.http.delete<Teacher>(url, httpOptions);
  }
}
