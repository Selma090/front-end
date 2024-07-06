import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListJiraComponent } from './list-jira.component';

describe('ListJiraComponent', () => {
  let component: ListJiraComponent;
  let fixture: ComponentFixture<ListJiraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListJiraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListJiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
