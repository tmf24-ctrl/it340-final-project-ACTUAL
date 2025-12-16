import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from './app.config';

@Injectable({
	providedIn: 'root'
})

export class AuthService {
	private apiUrl = AppConfig.apiUrl;
	
	constructor(private http: HttpClient) { }
	
	login(username: string, password: string) {
		return this.http.post(`${this.apiurl}/login`, { username, password });
	}
	
	register(username: string, password: string) {
		return this.http.post(`${this.apiUrl}/register`, { username, password });
	}
}
