import { Injectable } from " ../../../node_modules/@angular/core";
import {
  HttpClient,
  HttpHeaders,
} from " ../../../node_modules/@angular/common/http";
import { Observable } from " ../../../node_modules/rxjs";
import { Subject } from "../Models/Subject";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class SubjectService {
  constructor(private http: HttpClient) {}

  private subjectUrl = "http://localhost:53190/api/subject";

  getSubjects(): Observable<Subject[]> {
    var reqHeader = new HttpHeaders({ "No-Auth": "True" });
    return this.http.get<Subject[]>(this.subjectUrl, { headers: reqHeader });
  }

  getSubject(id: number): Observable<Subject> {
    const url = `${this.subjectUrl}/${id}`;

    return this.http.get<Subject>(url);
  }

  addSubject(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(this.subjectUrl, subject, httpOptions);
  }

  putSubject(subject: Subject | number): Observable<any> {
    const id = typeof subject === "number" ? subject : subject.ID;
    const url = `${this.subjectUrl}/${id}`;

    return this.http.put(url, subject, httpOptions);
  }

  deleteSubject(subject: Subject | number): Observable<Subject> {
    const id = typeof subject === "number" ? subject : subject.ID;
    const url = `${this.subjectUrl}/${id}`;

    return this.http.delete<Subject>(url, httpOptions);
  }
}
