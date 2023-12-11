import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDetails(){
    return this.http.get(this.url + "/dashboard/details/")
  }
}
