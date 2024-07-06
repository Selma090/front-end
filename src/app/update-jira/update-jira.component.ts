import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Jira } from '../jira';
import { ListJiraService } from '../list-jira.service';
import { KeycloakSecurityService } from '../keycloak-security.service';

@Component({
  selector: 'app-update-jira',
  templateUrl: './update-jira.component.html',
  styleUrls: ['./update-jira.component.scss']
})
export class UpdateJiraComponent implements OnInit {

  id!: number;
  jira: Jira = new Jira();
  isSidebarOpened: boolean = false; // Ajout pour la sidebar

  constructor(private jiraService: ListJiraService, private route: ActivatedRoute, private router: Router, public securityService:KeycloakSecurityService){}
  onChangePassword(){
    this.securityService.kc.accountManagement();
  }
  ngOnInit(): void{
    this.id = this.route.snapshot.params['id'];

    this.jiraService.getJiraById(this.id).subscribe(data => {
      this.jira = data;
    }, error => console.log(error));
    this.jira.ouvert_par = this.securityService.kc?.tokenParsed?.['name'];
  }

  onLogout(){
    this.securityService.kc.logout();
  }

  toggleSidebar(event: Event): void {
    event.preventDefault();
    this.isSidebarOpened = !this.isSidebarOpened;
  }

  onSubmit(){
    this.jiraService.updateJira(this.id, this.jira).subscribe(data => {
      this.goToJiraList();
    }, error => console.log(error));
  }

  goToJiraList(){
    this.router.navigate(['/jiras']);
  }
}
