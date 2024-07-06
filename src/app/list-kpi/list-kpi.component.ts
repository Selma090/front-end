import { Component, OnInit } from '@angular/core';
import { KPI } from '../kpi';
import { ListKpiService } from '../list-kpi.service';
import { Router } from '@angular/router';
import { KeycloakSecurityService } from '../keycloak-security.service';

@Component({
  selector: 'app-list-kpi',
  templateUrl: './list-kpi.component.html',
  styleUrls: ['./list-kpi.component.scss']
})
export class ListKpiComponent implements OnInit {

  kpis!: KPI[];
  isSidebarOpened = false;

  constructor(private kpiService: ListKpiService, private router: Router, public securityService:KeycloakSecurityService) { }

  ngOnInit(): void {
    this.getKpis();
  }
  onLogout(){
    this.securityService.kc.logout();
  }
  private getKpis() {
    this.kpiService.getKpisList().subscribe(data => {
      console.log(data);
      this.kpis = data;
    });
  }
  onChangePassword(){
    this.securityService.kc.accountManagement();
  }
  updateKpi(id: number) {
    this.router.navigate(['update-kpi', id]);
  }

  deleteKpi(id: number) {
    this.kpiService.deleteKpi(id).subscribe(data => {
      console.log(data);
      this.getKpis();
    });
  }

  createKpi(): void {
    this.router.navigate(['create-kpi']);
  }

  toggleSidebar(event: Event) {
    event.preventDefault(); // Prevent the default action
    this.isSidebarOpened = !this.isSidebarOpened;
  }
}
