import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Thread } from '../../../shared/model/thread';
import { AllUserData } from '../../../shared/to/all-user-data';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ThreadsService {

  constructor(private http: HttpClient) { }

  loadUserThreads(): Observable<AllUserData> {
    return this.http.get<AllUserData>('/api/threads');
  }

}
