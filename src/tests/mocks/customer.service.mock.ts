import { Injectable } from "@angular/core";
import { Customer } from "../../app/model/customer";
import { Observable, of } from "rxjs";

@Injectable()
export class CustomerServiceMock {
  getAll(): Observable<Customer[]> {
    return of([
      {
        id: 1,
        name: "Poul Brinkworth",
        email: "pbrinkworth0@parallels.com",
        address: "5 Stuart Crossing",
        ip_address: "242.112.112.66",
        active: false,
      },
      {
        id: 2,
        name: "Collie Battson",
        email: "cbattson1@paypal.com",
        address: "48223 Sommers Hill",
        ip_address: "212.75.82.188",
        active: false,
      },
    ]);
  }
}
