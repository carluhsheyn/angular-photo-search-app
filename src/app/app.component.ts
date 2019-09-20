import { Component } from '@angular/core';
import { FlickrService } from './flickr.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-flickr-photo-search';

  public inputList : any = [];
  public pageNumber : number = 0;
  public inputQuery = new FormControl('');
  public inputResult: string = null;
  public totalResults = null;
  public selectedPhoto = null;
  public isLoading : boolean = false;
  public inputRequired: string = "";
  public totalPage = null;

  constructor(private _flickrService : FlickrService) { }

  pagination() {
    this.isLoading = true;
    this._flickrService.getPhoto(this.pageNumber, this.inputQuery.value).subscribe(result => {
      this.inputList = result.photos.photo;
      this.isLoading = false;
    })
  }

  searchQuery() {
    if (this.inputQuery.value == "") {
      this.inputRequired = "Input Required";
    } else {
      this.isLoading = true;
      this._flickrService.getPhoto(this.pageNumber, this.inputQuery.value).subscribe(result => {
        this.inputList = result.photos.photo;
        this.inputResult = this.inputQuery.value;
        this.totalResults = result.photos.total;
        this.isLoading = false;
        this.pageNumber = 1;
        this.totalPage = result.photos.pages;
        this.inputRequired = "";

        console.log(this.pageNumber);
        console.log(this.totalPage);
      })
    }
  }

  photoInfo(id : number) {
    this._flickrService.getPhotoInfo(id).subscribe(result => {
      this.selectedPhoto = result.photo;
      $('#photoModal').modal('show');
    })
  }

  showPhoto() {
    return this._flickrService.displayPhoto(this.selectedPhoto);
  }

  getPhotoUrl(input : any) : string {
    return this._flickrService.displayPhoto(input);
  }
}
