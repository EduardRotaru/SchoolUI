import { Student } from "./Student";
import { Subject } from "./Subject";
import { Teacher } from "./Teacher";

export class Grades {
  ID: number;
  Grade: number;
  Evaluation: string;
  Commentary: string;
  Date: string;

  Student: Student;
  Subject: Subject;
  Teacher: Teacher;
}
