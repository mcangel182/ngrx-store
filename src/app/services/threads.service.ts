import { SendNewMessageActionPayload } from './../store/action';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Thread } from '../../../shared/model/thread';
import { AllUserData } from '../../../shared/to/all-user-data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '../../../shared/model/message';


@Injectable()
export class ThreadsService {

  constructor(private http: HttpClient) { }

  loadUserThreads(userId: number): Observable<AllUserData> {
    const headers =  new HttpHeaders({'USERID': userId.toString()});
    return this.http.get<AllUserData>('/api/threads', { headers });
  }

  saveNewMessage(payload: SendNewMessageActionPayload): Observable<any> {
    const headers =  new HttpHeaders({
      'USERID': payload.participantId.toString(),
      'Content-Type': 'application/json; charset=utf-8'
    });
    return this.http.post(`/api/threads/${payload.threadId}`, JSON.stringify({text: payload.text}), { headers });
  }
}
