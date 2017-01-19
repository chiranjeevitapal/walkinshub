import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Globals} from './globals';

@Injectable()
export class AppService {
    //urls
    private jobsListUrl = '/auth/facebook';
    private host = '';
    private port = Globals.NODE_PORT;

    constructor(private http: Http) {
        this.host = 'http://' + window.location.hostname + ':' + this.port;
    }

    fbAuthDetails(): Observable<any> {
        return this.http.get(this.host + this.jobsListUrl)
            .map((resp: Response) => ({
                jobs: resp.json()
            }))
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
