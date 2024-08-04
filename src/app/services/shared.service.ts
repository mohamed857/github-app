import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}
  private http = inject(HttpClient);

  getUserDetails = (userName: any) => {
    return this.http.get<any[]>('https://api.github.com/users/' + userName);
  };

  getRepositories = (userName: any) => {
    return this.http.get<any[]>(
      `https://api.github.com/users/${userName}/repos`
    );
  };

  getRepoLanguages(userName: any, repo: any) {
    const apiUrl = `https://api.github.com/repos/${userName}/${repo.name}/languages`;
    return this.http.get<any>(apiUrl);
  }
}
