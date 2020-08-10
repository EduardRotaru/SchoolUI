import { Subject } from "./Subject";
import { PersonBirthDate } from "./PersonBirthDate";

export class Teacher {
  ID: number;

  FirstName: string;
  LastName: string;
  Email: string;
  TeacherCode: string;

  NgbBirthdate: PersonBirthDate;
  BirthDate: string;

  Subject: Subject;
  Role: number;
  LoggedOn: any;
}
