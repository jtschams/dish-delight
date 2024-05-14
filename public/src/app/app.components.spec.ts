import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImgBBUploadService } from './imgbb.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'angular-imgbb-upload';
    imgbbService: ImgBBUploadService; // Initialize the imgbbService property

    constructor(private http: HttpClient) {
        this.imgbbService = new ImgBBUploadService(http); // Initialize the imgbbService property with the 'http' argument
    }
    
    onInput(e: Event) {
        const input = e.target as HTMLInputElement;
        if (input.files) { // Add a null check for input.files
            this.imgbbService.upload(input.files[0]).subscribe((url: string) => console.log(url)); // Specify the type of the url parameter
        }
    }
}

 