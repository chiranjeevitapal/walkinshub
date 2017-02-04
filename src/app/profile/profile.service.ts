import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Globals} from '../globals';

@Injectable()
export class ProfileService {
    //urls
    private profileUrl = '/api/jobseeker';
    private host = '';
    private port = Globals.NODE_PORT;

    constructor(private http: Http) {
        this.host = 'http://' + window.location.hostname + ':' + this.port;
    }

    getProfile(id: string): Observable<any> {
        return this.http.get(this.host + this.profileUrl + '/' + id)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }


    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'error');
    }
}
