import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl = 'http://localhost:9999/api/documentation';

  constructor(private http: HttpClient) { }

  listFiles() {
    return this.http.get<string[]>(`${this.baseUrl}/files`);
  }

  uploadFile(file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('pdf', file, file.name);

    return this.http.post<{ message: string }>(`${this.baseUrl}/create`, formData).pipe(
      map(response => response.message),
      catchError(this.handleError)
    );
  }

  downloadFile(fileName: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${fileName}`, { responseType: 'blob' }).pipe(
      catchError(this.handleError)
    );
  }

  getFilesList(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/files`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
      console.error('An error occurred:', error);
      return throwError('Something went wrong; please try again later.');
  }

}
