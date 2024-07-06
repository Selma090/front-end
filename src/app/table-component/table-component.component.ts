import { Component, OnInit } from '@angular/core';
import { ListTestService } from '../list-test.service';
import { KeycloakSecurityService } from '../keycloak-security.service';

@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.scss']
})
export class TableComponent implements OnInit {

  testData: any[] = [];
  countsByJira: any = {};
  uniqueJiras: { id: number, libelle: string, n_jira: string }[] = [];
  isSidebarOpened: boolean = false; // Ajout pour la sidebar

  constructor(private testService: ListTestService, public securityService:KeycloakSecurityService) { }

  ngOnInit(): void {
    this.loadTestData();
  }
  onLogout(){
    this.securityService.kc.logout();
  }
  loadTestData(): void {
    this.testService.getTestsList().subscribe(tests => {
      this.testData = tests;
      const loadedJiras = new Set<number>(); // Keep track of loaded Jira IDs

      this.testData.forEach(test => {
        if (test && test.jira && test.jira.id !== null && test.jira.id !== undefined) {
          const jiraId = test.jira.id;

          // Check if the Jira ID has already been loaded
          if (!loadedJiras.has(jiraId)) {
            loadedJiras.add(jiraId); // Mark the Jira ID as loaded
            const jiraLibelle = test.jira.libelle;
            const jiraN_jira = test.jira.n_jira;

            this.uniqueJiras.push({ id: jiraId, libelle: jiraLibelle, n_jira: jiraN_jira });

            this.testService.getJiraTestCounts(jiraId).subscribe(counts => {
              this.countsByJira[jiraId] = { ...counts, libelle: jiraLibelle };
              this.countsByJira[jiraId]['Total'] = 
                (counts['Bloqué'] || 0) + 
                (counts['KO'] || 0) + 
                (counts['En cours'] || 0) + 
                (counts['Done'] || 0);
            });
          }
        } else {
          console.warn('Encountered null or undefined test or jira property:', test);
        }
      });
    });
  }

  toggleSidebar(event: Event): void {
    event.preventDefault();
    this.isSidebarOpened = !this.isSidebarOpened;
  }
  onChangePassword(){
    this.securityService.kc.accountManagement();
  }
  getCount(jiraId: number, status: string): number {
    return this.countsByJira[jiraId] ? this.countsByJira[jiraId][status] || 0 : 0;
  }

  getLibelle(jiraId: number): string {
    return this.countsByJira[jiraId] ? this.countsByJira[jiraId].libelle || '' : '';
  }

}