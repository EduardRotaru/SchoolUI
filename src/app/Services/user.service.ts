import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";
import { User } from "../Models/user.model";

@Injectable()
export class UserService {
  readonly rootUrl = "http://localhost:53190";
  constructor(private http: HttpClient) {}

  registerUser(user: User, role: string) {
    const body = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName,
      TeacherCode: user.TeacherCode,
      Subject: user.Subject,
      Role: role,
    };
    var reqHeader = new HttpHeaders({
      "No-Auth": "True",
    });

    if (body.Role.toString() == role) {
      return this.http.post(this.rootUrl + "/api/user/register", body, {
        headers: reqHeader,
      });
    }
  }

  userAuthentication(userName, password) {
    var data =
      "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({
      "Content-Type": "application/x-www-urlencoded",
      "No-Auth": "True",
    });

    return this.http.post(this.rootUrl + "/token", data, {
      headers: reqHeader,
    });
  }

  getUserClaims() {
    return this.http.get(this.rootUrl + "/api/GetUserClaims");
  }

  getAllRoles() {
    var reqHeader = new HttpHeaders({ "No-Auth": "True" });
    return this.http.get(this.rootUrl + "/api/GetAllRoles", {
      headers: reqHeader,
    });
  }

  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var userRoles: string[] = JSON.parse(localStorage.getItem("userRoles"));
    allowedRoles.forEach((element) => {
      if (userRoles.indexOf(element) > -1) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }
}
export enum Roles {
  Teacher,
  Student,
}
