import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "dateNoTime" })
export class DateWithoutTime implements PipeTransform {
  transform(value: string): string {
    let d = new Date(value).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return d;
  }
}
