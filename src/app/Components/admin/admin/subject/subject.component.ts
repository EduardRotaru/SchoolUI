import { Component, OnInit } from "@angular/core";
import { SubjectService } from "src/app/Services/Subject.service";
import { Subject } from "src/app/Models/Subject";

@Component({
  selector: "app-subject",
  templateUrl: "./subject.component.html",
  styleUrls: ["./subject.component.scss"],
})
export class SubjectComponent implements OnInit {
  subjects: Subject[];
  isNewForm: boolean;
  subjectForm: boolean;
  newSubject: Subject;

  constructor(private subjectService: SubjectService) {}

  ngOnInit() {
    this.newSubject = new Subject();
    this.getSubjects();
  }

  getSubjects(): void {
    this.subjectService.getSubjects().subscribe((subjects) => {
      this.subjects = subjects;
    });
  }

  saveSubject(subject: Subject) {
    if (this.isNewForm) {
      this.subjectService
        .addSubject(subject)
        .subscribe((_) => this.getSubjects());
    } else {
      this.subjectService.putSubject(subject).subscribe();
    }

    this.subjectForm = false;
  }

  deleteSubject(subject: Subject) {
    this.subjects = this.subjects.filter((j) => j !== subject);
    this.subjectService.deleteSubject(subject).subscribe();
  }

  showAddForm() {
    if (this.subjects.length) {
      this.newSubject = new Subject();
    }

    this.isNewForm = true;
    this.subjectForm = !this.subjectForm;
  }

  showEditForm(subject: Subject, content) {
    if (!subject) {
      this.subjectForm = false;
      return;
    }

    this.subjectForm = true;
    this.isNewForm = false;
    this.newSubject = subject;
  }
}
