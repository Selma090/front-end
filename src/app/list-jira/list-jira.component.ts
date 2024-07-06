import { Component, OnInit } from '@angular/core';
import { Jira } from '../jira';
import { ListJiraService } from '../list-jira.service';
import { Router } from '@angular/router';
import { KeycloakSecurityService } from '../keycloak-security.service';

@Component({
  selector: 'app-list-jira',
  templateUrl: './list-jira.component.html',
  styleUrls: ['./list-jira.component.scss']
})
export class ListJiraComponent implements OnInit {

  jiras: Jira[] = [];
  isSidebarOpened = false;

  constructor(private jiraService: ListJiraService, private router: Router, public securityService:KeycloakSecurityService) {}

  ngOnInit(): void {
    this.getJiras();
  }
  onLogout(){
    this.securityService.kc.logout();
  }
  private getJiras() {
    this.jiraService.getJirasList().subscribe(data => {
      console.log(data);
      this.jiras = data;
    });
  }
  onChangePassword(){
    this.securityService.kc.accountManagement();
  }
  updateJira(id: number) {
    this.router.navigate(['update-jira', id]);
  }

  deleteJira(id: number) {
    this.jiraService.deleteJira(id).subscribe(data => {
      console.log(data);
      this.getJiras();
    });
  }

  createJira(): void {
    this.router.navigate(['create-jira']);
  }

  toggleSidebar(event: Event) {
    event.preventDefault(); // Prevent the default action
    this.isSidebarOpened = !this.isSidebarOpened;
  }
  
}
