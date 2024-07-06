import { Component, OnInit } from '@angular/core';
import { Test } from '../list';
import { Jira } from '../jira';
import { ListTestService } from '../list-test.service';
import { Router } from '@angular/router';
import { KeycloakSecurityService } from '../keycloak-security.service';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss']
})
export class CreateTestComponent implements OnInit {
  isSidebarOpened: boolean = false;
  test: Test = new Test();
  jiras: Jira[] = [];
  selectedJira: number | null = null;

  constructor(private testService: ListTestService, private router: Router, public securityService:KeycloakSecurityService) { }

  ngOnInit(): void {
    this.loadJiras();
  }
  onLogout(){
    this.securityService.kc.logout();
  }
  onChangePassword(){
    this.securityService.kc.accountManagement();
  }
  toggleSidebar(event: Event): void {
    event.preventDefault();
    this.isSidebarOpened = !this.isSidebarOpened;
  }

  loadJiras() {
    this.testService.getJirasList().subscribe(data => {
      this.jiras = this.filterUniqueJiras(data);
    });
  }

  filterUniqueJiras(jiras: Jira[]): Jira[] {
    const seen = new Set();
    return jiras.filter(jira => {
      const duplicate = seen.has(jira.n_jira);
      seen.add(jira.n_jira);
      return !duplicate;
    });
  }

  saveTest() {
    // Convert null to undefined
    const jiraId = this.selectedJira !== null ? this.selectedJira : undefined;
    this.testService.createTest(this.test, jiraId).subscribe(
      data => {
        console.log(data);
        this.goToTestList();
      },
      error => console.log(error)
    );
  }

  goToTestList() {
    this.router.navigate(['/tests']);
  }

  onSubmit() {
    console.log('Selected Jira ID:', this.selectedJira);
    console.log(this.test);
    this.saveTest();
  }
}
