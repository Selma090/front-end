import { Component, OnInit } from '@angular/core';
import { KPI } from '../kpi';
import { ListKpiService } from '../list-kpi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakSecurityService } from '../keycloak-security.service';

@Component({
  selector: 'app-update-kpi',
  templateUrl: './update-kpi.component.html',
  styleUrls: ['./update-kpi.component.scss']
})
export class UpdateKpiComponent implements OnInit {

  id!: number;
  kpi: KPI = new KPI();
  isSidebarOpened: boolean = false; // Ajout pour la sidebar

  constructor(private kpiService: ListKpiService, private route: ActivatedRoute, private router: Router, public securityService:KeycloakSecurityService){}

  ngOnInit(): void{
    this.id = this.route.snapshot.params['id'];

    this.kpiService.getKpiById(this.id).subscribe(data => {
      this.kpi = data;
    }, error => console.log(error));
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
  onSubmit(){
    this.kpiService.updateKpi(this.id, this.kpi).subscribe(data => {
      this.goToKpiList();
    }, error => console.log(error));
  }

  goToKpiList(){
    this.router.navigate(['/kpis']);
  }
}
