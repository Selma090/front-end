import { Component, OnInit } from '@angular/core';
import { FileService } from '../file-service.service';

@Component({
  selector: 'app-download-file',
  templateUrl: './download-file.component.html',
  styleUrl: './download-file.component.scss'
})
export class DownloadFileComponent /* implements OnInit */{

  selectedFile!: File;
  files: string[] = [];

  constructor(private fileService: FileService) { }

  ngOnInit() {
    this.loadFiles();
  }
  
  loadFiles() {
    this.fileService.getFilesList().subscribe({
      next: (files) => {
        this.files = files;
      },
      error: (error) => {
        console.error('Error loading files:', error);
      }
    });
  }

  onDownload(fileName: string) {
    this.fileService.downloadFile(fileName).subscribe({
      next: (response: Blob) => {
        const blob = new Blob([response], { type: response.type });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a); // Append anchor element to document body
        a.click();
        document.body.removeChild(a); // Remove anchor element from document body after download
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error downloading file:', error);
        alert('Error downloading file.');
      }
    });
  }
}
