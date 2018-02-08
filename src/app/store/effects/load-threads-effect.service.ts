import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ThreadsService } from '../../services/threads.service';
import { LOAD_USER_THREADS_ACTION, UserThreadsLoadedAction, SELECT_USER_ACTION, LoadUserThreadsAction } from '../action';
import { Actions, Effect } from '@ngrx/effects';

@Injectable()
export class LoadThreadsEffectService {

  constructor(private threadService: ThreadsService,
              private actions$: Actions) {  }

  @Effect() userThreads$: Observable<Action> = this.actions$
                               .ofType(LOAD_USER_THREADS_ACTION)
                               .debug('action received')
                               .switchMap(action => this.threadService.loadUserThreads(action.payload))
                               .debug('data received via HTTP request')
                               .map(allUserData => new UserThreadsLoadedAction(allUserData));
                               // No hay que hacer dispatch, esto lo hace el effect automáticamente

  @Effect() newUserSelected$: Observable<Action> = this.actions$
                               .ofType(SELECT_USER_ACTION)
                               .debug('New user selected')
                               .map(action => new LoadUserThreadsAction(action.payload));
}
