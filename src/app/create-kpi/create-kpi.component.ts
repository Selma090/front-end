import { Component, OnInit } from '@angular/core';
import { KPI } from '../kpi';
import { ListKpiService } from '../list-kpi.service';
import { Router } from '@angular/router';
import { KeycloakSecurityService } from '../keycloak-security.service';

@Component({
  selector: 'app-create-kpi',
  templateUrl: './create-kpi.component.html',
  styleUrls: ['./create-kpi.component.scss']
})
export class CreateKpiComponent implements OnInit {

  kpi: KPI = new KPI();
  isSidebarOpened: boolean = false;

  constructor(private kpiService: ListKpiService, private router: Router, public securityService:KeycloakSecurityService) { }

  ngOnInit(): void {
  }
  onLogout(){
    this.securityService.kc.logout();
  }
  toggleSidebar(event: Event): void {
    event.preventDefault();
    this.isSidebarOpened = !this.isSidebarOpened;
  }
  onChangePassword(){
    this.securityService.kc.accountManagement();
  }
  saveKpi(): void {
    this.kpiService.createKpi(this.kpi).subscribe(data => {
      console.log(data);
      this.goToKpiList();
    },
    error => console.log(error));
  }

  goToKpiList(): void {
    this.router.navigate(['/kpis']);
  }

  onSubmit(): void {
    console.log(this.kpi);
    this.saveKpi();
  }
}
