import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { RouterModule } from '@angular/router'; // Importez RouterModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


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
import { KeycloakSecurityService } from './keycloak-security.service';
import { RequestInterceptorService } from './request-interceptor.service';



export function kcFactory(kcSecService:KeycloakSecurityService){
  return ()=>kcSecService.init();
}

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    UpdateTestComponent,
    CreateTestComponent,
    ListJiraComponent,
    UpdateJiraComponent,
    CreateJiraComponent,
    CreateKpiComponent,
    UpdateKpiComponent,
    ListKpiComponent,
    DownloadFileComponent,
    UploadFileComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([]), // Assurez-vous d'importer RouterModule.forRoot ici
  
  ],
  providers: [
    { provide:APP_INITIALIZER, deps:[KeycloakSecurityService], useFactory:kcFactory, multi:true},
    { provide:HTTP_INTERCEPTORS, useClass:RequestInterceptorService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
