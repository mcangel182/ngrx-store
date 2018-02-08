import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Thread } from '../../../shared/model/thread';
import { AllUserData } from '../../../shared/to/all-user-data';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class ThreadsService {

  constructor(private http: HttpClient) { }

  loadUserThreads(userId: number): Observable<AllUserData> {
    const headers =  new HttpHeaders({'USERID': userId.toString()});
    return this.http.get<AllUserData>('/api/threads', { headers });
  }

}
