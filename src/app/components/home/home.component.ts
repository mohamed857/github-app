import { Component, OnInit, inject } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  userName = 'johnpapa';
  repositories: any[] = [];
  user: any = null;
  isLoading: boolean = false;
  userNotFound: boolean = false;
  pageSizes: number[] = [10, 20, 50, 100];
  pageSize: number = 10;
  currentPage = 1;

  private _shar = inject(SharedService);

  search = (name: any) => {
    this.userName = name;
    this.isLoading = true;
    this.userNotFound = false;
    this.user = null;
    this.repositories = [];
    this.show();
  };

  ngOnInit() {
    this.show();
  }

  show = () => {
    this._shar.getUserDetails(this.userName).subscribe(
      (user) => {
        this.user = user;
        this.getRepositories(this.userName, 0, this.pageSize);
      },
      (error) => {
        this.isLoading = false;
        this.userNotFound = true;
      }
    );
  };

  getRepositories(userName: any, startIndex: number, endIndex: number) {
    this._shar.getRepositories(userName).subscribe(
      (repositories: any[]) => {
        this.repositories = repositories.slice(startIndex, endIndex);
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = this.currentPage * this.pageSize;
      this.getRepositories(this.userName, startIndex, endIndex);
    }
  }

  nextPage(): void {
    if (this.repositories.length === this.pageSize) {
      this.currentPage++;
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = this.currentPage * this.pageSize;
      this.getRepositories(this.userName, startIndex, endIndex);
    }
  }
  
}
