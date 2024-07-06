import { Component, OnInit } from '@angular/core';
import { Jira } from '../jira';
import { ListJiraService } from '../list-jira.service';
import { Router } from '@angular/router';
import { KeycloakSecurityService } from '../keycloak-security.service';

@Component({
  selector: 'app-create-jira',
  templateUrl: './create-jira.component.html',
  styleUrls: ['./create-jira.component.scss']
})
export class CreateJiraComponent implements OnInit {

  isSidebarOpened: boolean = false;
  selectedJiraId!: number;
  jira: Jira = new Jira();

  constructor(private jiraService: ListJiraService, private router: Router, public securityService:KeycloakSecurityService) { }

  ngOnInit(): void {
    this.jira.ouvert_par = this.securityService.kc?.tokenParsed?.['name'];
  }

  toggleSidebar(event: Event): void {
    event.preventDefault();
    this.isSidebarOpened = !this.isSidebarOpened;
  }
  onChangePassword(){
    this.securityService.kc.accountManagement();
  }
  onLogout(){
    this.securityService.kc.logout();
  }

  saveJira(): void {
    this.jiraService.createJira(this.jira).subscribe(data => {
      console.log(data);
      this.goToJiraList();
    },
    error => console.log(error));
  }

  goToJiraList(): void {
    this.router.navigate(['/jiras']);
  }

  onSubmit(): void {
    console.log(this.jira);
    this.saveJira();
  }

  onSelectJira(jira: Jira): void {
    this.selectedJiraId = jira.id;
  }
}
