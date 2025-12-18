import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
	private apiUrl = 'http://10.10.10.20:3000';
	
	constructor(private http: HttpClient) {}
	
	getData() {
		const token = localStorage.getItem('token');
		const headers = new HttpHeaders({
			Authorization: token || ''
		});
		return this.http.get(`${this.apiUrl}/data`, { headers });
	}
}
