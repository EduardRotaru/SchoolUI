import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  CanActivateChild,
} from "@angular/router";

// @Injectable()
// export class AnonymousGuard implements CanActivate, CanActivateChild {
//   isLoggedIn: boolean = false; // retrieved from a authService
//   // change this to 'false' to simulate anonymous user (and also to auth-guard)

//   constructor(private router: Router) {}

//   canActivate(route: ActivatedRouteSnapshot): boolean {
//     // If Anonymous, can access the page
//     if (!this.isLoggedIn) {
//       this.router.navigate(["/home"]);
//       return false;
//     }
//     // Else force redirect to login
//     this.router.navigate(["/login"]);
//     return true;
//   }

//   canActivateChild(route: ActivatedRouteSnapshot): boolean {
//     return this.canActivate(route);
//   }
// }
