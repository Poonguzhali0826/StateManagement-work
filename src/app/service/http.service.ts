import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const url = ' http://localhost:3000/employees';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient,) { }        //import httpclientModule in app Module

  createEmployee(data: any) {
    return this.http.post(url, data);
  }

  
  getEmployee() {
    return this.http.get(url);
  }

  // update
  updateEmployee(id: string, data: any) {
    return this.http.put(`${url}/${id}`, data);
  }

  // Delete
  EmployeeDelete(id: string) {
    return this.http.delete(`${url}/${id}`);
  }
}
