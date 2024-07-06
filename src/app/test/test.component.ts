import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Test } from '../list';
import { ListTestService } from '../list-test.service';
import { KeycloakSecurityService } from '../keycloak-security.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  tests: Test[] = [];
  isSidebarOpened = false;

  constructor(private testService: ListTestService, private router: Router, public securityService:KeycloakSecurityService) {}

  ngOnInit(): void {
    this.getTests();
    
  }
  onLogout(){
    this.securityService.kc.logout();
  }
  onChangePassword(){
    this.securityService.kc.accountManagement();
  }
  getTests(): void {
    this.testService.getTestsList().subscribe(
      (data: Test[]) => {
        this.tests = data;
        console.log('Fetched tests:', this.tests);
        this.tests.forEach(test => {
          if (test.jiraId) {
            this.testService.getJiraById(test.jiraId).subscribe(
              (jira: any) => {
                console.log('Fetched Jira for test', test.id, ':', jira);
                test.jira = jira; // Assign the entire jira object to the test
              },
              (error) => {
                console.error('Error fetching Jira ID for test:', error);
              }
            );
          }
        });
      },
      (error) => {
        console.error('Error fetching tests:', error);
      }
    );
  }

  updateTest(id: number): void {
    this.router.navigate(['update-test', id]);
  }

  deleteTest(id: number): void {
    this.testService.deleteTest(id).subscribe(
      () => {
        console.log('Test deleted successfully');
        this.getTests();
      },
      (error) => {
        console.error('Error deleting test:', error);
      }
    );
  }

  validateTest(id: number): void {
    this.testService.validateTestCase(id).subscribe(
      {
        next: (response) => {
          alert(response);
          this.markTestAsValidated(id);
        },
        error: (error) => {
          console.error('Error validating test case:', error);
          alert('Error validating test case.');
        }
      }
    );
  }

  createTest(): void {
    this.router.navigate(['create-test']);
  }

  private markTestAsValidated(id: number): void {
    const test = this.tests.find(t => t.id === id);
    if (test) {
      test.isValidated = true;
      this.saveValidationStatus(id, true);
    }
  }

  private saveValidationStatus(id: number, status: boolean): void {
    const validatedTests = JSON.parse(localStorage.getItem('validatedTests') || '{}');
    validatedTests[id] = status;
    localStorage.setItem('validatedTests', JSON.stringify(validatedTests));
  }

  private getValidationStatus(id: number): boolean {
    const validatedTests = JSON.parse(localStorage.getItem('validatedTests') || '{}');
    return validatedTests[id] || false;
  }

  toggleSidebar(event: Event) {
    event.preventDefault(); // Prevent the default action
    this.isSidebarOpened = !this.isSidebarOpened;
  }
}
