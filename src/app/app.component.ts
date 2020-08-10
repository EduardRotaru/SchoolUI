import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  // private activatedRoute: ActivatedRoute;
  // private router: Router;
  // showTeacher: boolean = false;
  // showStudent: boolean = false;
  // constructor(activatedRoute: ActivatedRoute, router: Router) {
  //   this.activatedRoute = activatedRoute;
  //   this.router = router;
  // }
  // ngOnInit() {}
  // CloseStudentOutlet() {
  //   this.router.navigate([
  //     "/homepage",
  //     { outlets: { tch: ["teacher"], std: null } },
  //   ]);
  //   this.showTeacher = true;
  //   this.showStudent = false;
  // }
  // CloseTeacherOutlet() {
  //   this.router.navigate([
  //     "/homepage",
  //     { outlets: { std: ["student"], tch: null } },
  //   ]);
  //   this.showTeacher = false;
  //   this.showStudent = true;
  // }

  constructor() {}
}
