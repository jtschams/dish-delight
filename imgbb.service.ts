import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ImgBBUploadService {
    private readonly API_KEY: string = '123b3628999f3acd81d822ab7e51db47';

    constructor(private http: HttpClient) { }

    upload(image: File): Observable<string> {
        const formData = new FormData();

        formData.append('image', image);
        formData.append('key', this.API_KEY);

        return this.http.post('/upload', formData, { params: { key: this.API_KEY } })
        .pipe(map((response: any) => response['data']['url']));
    }
}