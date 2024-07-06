import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KPI } from './kpi';

@Injectable({
  providedIn: 'root'
})
export class ListKpiService {

  private baseURL = "http://localhost:9999/api/kpis";

  constructor(private httpClient: HttpClient) { }
  
  getKpisList(): Observable<KPI[]>{
    return this.httpClient.get<KPI[]>(`${this.baseURL}/all`);
  }

  createKpi(kpi: KPI): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/create`, kpi);
  }

  getKpiById(id: number): Observable<KPI>{
    return this.httpClient.get<KPI>(`${this.baseURL}/${id}`);
  }

  updateKpi(id: number, kpi: KPI): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/update/${id}`, kpi);
  }

  deleteKpi(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/delete/${id}`);
  }
}
