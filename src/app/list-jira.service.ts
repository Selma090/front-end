import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jira } from './jira';
import { Test } from './list';

@Injectable({
  providedIn: 'root'
})
export class ListJiraService {

  private baseURL = "http://localhost:9999/api/jiras";

  constructor(private httpClient: HttpClient) { }
  
  getJirasList(): Observable<Jira[]>{
    return this.httpClient.get<Jira[]>(`${this.baseURL}/all`);
  }

  createJira(jira: Jira): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/create`, jira);
  }
  

  getJiraById(id: number): Observable<Jira>{
    return this.httpClient.get<Jira>(`${this.baseURL}/${id}`);
  }

  updateJira(id: number, jira: Jira): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/update/${id}`, jira);
  }

  deleteJira(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/delete/${id}`);
  }

  getTestCasesForJira(id: number): Observable<Test[]> {
    return this.httpClient.get<Test[]>(`http://localhost:9999/api/jiras/${id}/testcases`);
  }
}
