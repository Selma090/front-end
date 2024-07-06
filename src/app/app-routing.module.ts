import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestComponent } from './test/test.component';
import { UpdateTestComponent } from './update-test/update-test.component';
import { CreateTestComponent } from './create-test/create-test.component';
import { ListJiraComponent } from './list-jira/list-jira.component';
import { UpdateJiraComponent } from './update-jira/update-jira.component';
import { CreateJiraComponent } from './create-jira/create-jira.component';
import { CreateKpiComponent } from './create-kpi/create-kpi.component';
import { UpdateKpiComponent } from './update-kpi/update-kpi.component';
import { ListKpiComponent } from './list-kpi/list-kpi.component';
import { DownloadFileComponent } from './download-file/download-file.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { TableComponent } from './table-component/table-component.component';


const routes: Routes = [
  { path: '', component: TableComponent }, // Redirection vers LoginComponent
  { path: 'tests', component: TestComponent},
  { path: 'jiras', component: ListJiraComponent},
  { path: 'kpis', component: ListKpiComponent},
  { path: 'create-test', component: CreateTestComponent},
  { path: 'create-jira', component: CreateJiraComponent},
  { path: 'create-kpi', component: CreateKpiComponent},
  { path: 'update-test/:id', component: UpdateTestComponent},
  { path: 'update-jira/:id', component: UpdateJiraComponent},
  { path: 'update-kpi/:id', component: UpdateKpiComponent},
  { path: 'download', component: DownloadFileComponent},
  { path: 'upload', component: UploadFileComponent},
  { path: 'table', component: TableComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
