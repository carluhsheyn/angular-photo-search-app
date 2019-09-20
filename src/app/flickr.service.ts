import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FlickrService {

  private flickrParams = {
    params: {
      api_key : '755bf0e2429f0bc396558d6fefe6adbb',
      sort: "relevance",
      privacy_filter : '1',
      safe_search : '1',
      content_type : '1',
      media: 'photos',
      format : 'json',
      nojsoncallback: '1',
      per_page : '9'
    }
  }

  private flickrUrl = "https://www.flickr.com/services/rest/";

  constructor(private http : HttpClient) { }

  // set the arguments for api
  getPhoto(pageNumber : number, inputString : string) : Observable<any> {
    const API_URL = this.flickrUrl;
    this.flickrParams.params['method'] = 'flickr.photos.search';
    this.flickrParams.params['tags'] = inputString;
    this.flickrParams.params['text'] = inputString;
    this.flickrParams.params['page'] = pageNumber.toString();
    return this.http.get<any>(API_URL,this.flickrParams);
  }

  // get the image info
  getPhotoInfo(photoId : number) : Observable<any> {
    const API_URL = this.flickrUrl;
    this.flickrParams.params['method'] = 'flickr.photos.getInfo';
    this.flickrParams.params['photo_id'] = photoId;
    return this.http.get<any>(API_URL,this.flickrParams);
  }

  // url for displaying images
  displayPhoto(input : any) : string {
    return 'http://farm'+input.farm+'.static.flickr.com/'+input.server+'/'+input.id+'_'+input.secret+'.jpg';
  }
}
