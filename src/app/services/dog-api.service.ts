import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DogApiService {
  
  private apiUrl = 'https://huachitos.cl/api/animales';
  private apiUrlStory = 'https://huachitos.cl/api/animales';

  constructor(private http: HttpClient) { }

  getRandomDogImageUrl(): Observable<{data: any[]}> {
    return this.http.get<{data: any[]}>(this.apiUrl);
  }

  getRandomDogStoriesImageUrl(): Observable<any> {
    return this.http.get(this.apiUrlStory, { responseType: 'blob' });
  }
}