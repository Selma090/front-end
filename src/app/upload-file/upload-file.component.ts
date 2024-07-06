import { Component, OnInit } from '@angular/core';
import { FileService } from '../file-service.service';
import { KeycloakSecurityService } from '../keycloak-security.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  selectedFile!: File;
  files: { id: number; name: string; }[] = [];
  isSidebarOpened = false;

  constructor(private fileService: FileService, public securityService:KeycloakSecurityService) { }

  ngOnInit() {
    this.loadFiles();
  }
  onLogout(){
    this.securityService.kc.logout();
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  onChangePassword(){
    this.securityService.kc.accountManagement();
  }
  onUpload() {
    if (this.selectedFile) {
      this.fileService.uploadFile(this.selectedFile).subscribe({
        next: (response) => {
          alert('File uploaded successfully.');
          this.loadFiles(); // Reload the file list after upload
        },
        error: (error) => {
          console.error('Error uploading file:', error);
          alert('Error uploading file.');
        }
      });
    } else {
      alert('Please select a file first.');
    }
  }

  loadFiles() {
    this.fileService.listFiles().subscribe({
      next: (files) => {
        this.files = files.map((file, index) => ({ id: index, name: file }));
      },
      error: (error) => {
        console.error('Error loading files:', error);
        alert('Error loading files.');
      }
    });
  }

  onDownload(fileName: string) {
    this.fileService.downloadFile(fileName).subscribe({
      next: (response) => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error downloading file:', error);
        alert('Error downloading file.');
      }
    });
  }

  toggleSidebar(event: Event) {
    event.preventDefault();
    this.isSidebarOpened = !this.isSidebarOpened;
  }
}
