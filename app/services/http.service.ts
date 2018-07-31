import {Injectable, ErrorHandler} from '@angular/core';
import {Observable, Observer} from 'rxjs/Rx';
import {Http, RequestOptions, Headers, URLSearchParams} from '@angular/http';
@Injectable()
export class HttpService {
  constructor(public _http: Http){}
  request(url: string, opts: Object) {
    return new Observable(observer => {
      this._http.request(url,new RequestOptions(opts)).map(res => res.json())
      .subscribe(data => {
        observer.next(data);
        observer.complete();
      })
    })
  }
  get(url: string,opts?: Object) {

  }
}
