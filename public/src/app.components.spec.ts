import { Component } from '@angular/core';
import { ImgBBUploadService } from '/imgbb.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'angular-imgbb-upload';

    constructor(private readonly HttpClient) {}
    
    onInput(e: Event) {
        const input = e.target as HTMLInputElement;
       this.imgbbService.upload(input.files[0]).subscribe(url => console.log(url));
    }
}

 