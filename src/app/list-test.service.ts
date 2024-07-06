import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Test } from './list';
import { Observable, catchError, tap } from 'rxjs';
import { Jira } from './jira';

@Injectable({
  providedIn: 'root'
})
export class ListTestService {
  private baseURL = "http://localhost:9999/api/tests";
  private jiraApiUrl = "http://localhost:9999/api/jiras";

  constructor(private httpClient: HttpClient) { }

  getJirasList(): Observable<Jira[]> {
    return this.httpClient.get<Jira[]>(`${this.jiraApiUrl}/all`);
  }

  getJiraTestCounts(jiraId: number): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/counts/${jiraId}`);
  }

  getTestsList(): Observable<Test[]> {
    return this.httpClient.get<Test[]>(`${this.baseURL}/all`)
  }

  createTest(testDto: Test, jiraId?: number): Observable<Test> {
    console.log('Creating Test:', testDto, 'with Jira ID:', jiraId);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = jiraId !== undefined ? `${this.baseURL}/create?id=${jiraId}` : `${this.baseURL}/create`;
    return this.httpClient.post<Test>(url, testDto, { headers });
  }
  
  getJiraIssues(): Observable<Jira[]> {
    return this.httpClient.get<Jira[]>(`${this.jiraApiUrl}`);
  }

  getTestById(id: number): Observable<Test> {
    return this.httpClient.get<Test>(`${this.baseURL}/${id}`);
  }

  getJiraById(jiraId: number): Observable<Jira> {
    console.log('Fetching Jira for ID:', jiraId);
    return this.httpClient.get<Jira>(`${this.jiraApiUrl}/${jiraId}`).pipe(
      tap(data => console.log('Fetched Jira:', data)),
      catchError(error => {
        console.error('Error fetching Jira:', error);
        throw error;
      })
    );
  }

  updateTest(id: number, test: Test, jiraId?: number): Observable<Object> {
    console.log('Updating Test ID:', id, 'with Jira ID:', jiraId, 'Test Data:', test);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = jiraId != null ? `${this.baseURL}/update/${id}?jiraId=${jiraId}` : `${this.baseURL}/update/${id}`;
    return this.httpClient.put(url, test, { headers });
  }
  
  deleteTest(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/delete/${id}`);
  }

  validateTestCase(id: number): Observable<string> {
    return this.httpClient.post(`${this.baseURL}/${id}/validate`, {}, { responseType: 'text' });
  }
}
