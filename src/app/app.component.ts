import { Component } from '@angular/core';
import { FlickrService } from './flickr.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  title = 'angular-photo-search-app';

  public inputList : any = [];
  public pageNumber : number = 0;
  public inputQuery = new FormControl('');
  public inputResult : string = "";
  public totalResults = null;
  public selectedPhoto = null;
  public isLoading : boolean = false;
  public inputRequired: string = "";

  constructor(private _flickService : FlickrService) { }

    pagination(){
      this.isLoading = true;
      this._flickService.getPhotos(this.pageNumber, this.inputQuery.value).subscribe(result => {
        this.inputList = result.photos.photo;
        this.isLoading = false;
      });
    };

    searchQuery() {
      if(this.inputQuery.value == "") {
      } else{
        this.isLoading = true;
        this._flickService.getPhotos(this.pageNumber, this.inputQuery.value).subscribe(result => {
          this.inputList = result.photos.photos;
          this.isLoading = false;
          this.inputResult = this.inputQuery.value;
          this.totalResults = result.photos.total;
          this.pageNumber = 1;
        })
      }
    }

    photoInfo(id : number) {
      this._flickService.getPhotoInfo(id).subscribe(result => {
        this.selectedPhoto = result.photo;
        $('#photoModal').modal('show');
      })
    }

    showPhoto() {
      return this._flickService.displayPhoto(this.selectedPhoto);
    }

    getPhotoUrl(input : any) : string {
      return this._flickService.displayPhoto(input);
    }
  }
