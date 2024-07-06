import { Component, OnInit } from '@angular/core';
import { Test } from '../list';
import { ListTestService } from '../list-test.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Jira } from '../jira';
import { KeycloakSecurityService } from '../keycloak-security.service';

@Component({
  selector: 'app-update-test',
  templateUrl: './update-test.component.html',
  styleUrls: ['./update-test.component.scss']
})
export class UpdateTestComponent implements OnInit {

  id!: number;
  test: Test = new Test();
  jiras: Jira[] = [];
  selectedJiraId: number | null = null;
  isSidebarOpened: boolean = false;
  uniqueJiras: Jira[] = []; // Array to hold unique Jiras

  constructor(
    private testService: ListTestService,
    private route: ActivatedRoute,
    private router: Router,
    public securityService: KeycloakSecurityService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    // Fetch test details
    this.testService.getTestById(this.id).subscribe(
      data => {
        this.test = data;
        this.selectedJiraId = this.test.jiraId ?? null;
      },
      error => console.log(error)
    );

    // Fetch list of Jiras
    this.testService.getJirasList().subscribe(
      jiras => {
        this.jiras = jiras;
        this.uniqueJiras = this.getUniqueJiras(jiras); // Filter unique Jiras
      },
      error => console.error('Error fetching Jiras:', error)
    );
  }

  // Method to filter unique Jiras based on ID
  getUniqueJiras(jiras: Jira[]): Jira[] {
    const uniqueJiras = Array.from(new Set(jiras.map(jira => jira.n_jira))).map(n_jira => {
      return jiras.find(jira => jira.n_jira === n_jira)!;
    });

    return uniqueJiras;
  }

  // Logout method
  onLogout() {
    this.securityService.kc.logout();
  }

  // Select Jira event handler
  onJiraSelect(event: any) {
    const selectedValue = event.target.value;
    this.selectedJiraId = selectedValue ? parseInt(selectedValue) : null;
  }

  // Toggle sidebar method
  toggleSidebar(event: Event): void {
    event.preventDefault();
    this.isSidebarOpened = !this.isSidebarOpened;
  }

  // Change password method
  onChangePassword() {
    this.securityService.kc.accountManagement();
  }

  // Form submit method
  onSubmit() {
    this.test.jiraId = this.selectedJiraId;
    const jiraIdToSend = this.selectedJiraId !== null ? this.selectedJiraId : undefined;
    this.testService.updateTest(this.id, this.test, jiraIdToSend).subscribe(
      data => {
        this.goToTestList();
      },
      error => console.error('Error updating test:', error)
    );
  }

  // Navigate to test list method
  goToTestList() {
    this.router.navigate(['/tests']);
  }
}
