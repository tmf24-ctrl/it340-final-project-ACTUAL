import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	private apiUrl = 'http://10.10.10.10:3000/api'; //backend vm ip
	
	constructor(private http: HttpClient) { }
	
	getUsers(): Observable<any> {
		return this.http.get(`${this.apiUrl}/users`);
	}
}
