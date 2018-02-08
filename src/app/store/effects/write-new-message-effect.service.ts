import { Actions, Effect } from '@ngrx/effects';
import { ThreadsService } from './../../services/threads.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { SEND_NEW_MESSAGE } from '../action';

@Injectable()
export class WriteNewMessageEffectService {

  constructor(private threadService: ThreadsService,
              private actions$: Actions) { }

  @Effect({dispatch: false}) newMessages$: Observable<any> = this.actions$
              .ofType(SEND_NEW_MESSAGE)
              .switchMap(action => this.threadService.saveNewMessage(action.payload));
}
