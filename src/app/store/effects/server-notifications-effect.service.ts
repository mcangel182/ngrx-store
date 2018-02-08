import { ThreadsService } from './../../services/threads.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Effect } from '@ngrx/effects';
import { NewMessagesReceivedAction } from '../action';
import { ApplicationState } from '../application-state';
import { Store } from '@ngrx/store';

@Injectable()
export class ServerNotificationsEffectService {

  constructor(private threadService: ThreadsService,
              private store: Store<ApplicationState>) { }

  @Effect() newMessages$ = Observable.interval(3000)
                                     .withLatestFrom(<any>this.store.select('uiState'))
                                     .map(([any, uiState]) => uiState)
                                     .filter(uiState => uiState.userId)
                                     .switchMap(uiState => this.threadService.loadNewMessagesForUser(uiState.userId))
                                     .debug('new messages received from server')
                                     .map(messages => new NewMessagesReceivedAction(messages));
}
