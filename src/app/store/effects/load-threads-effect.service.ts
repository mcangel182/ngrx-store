import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ThreadsService } from '../../services/threads.service';
import { LOAD_USER_THREADS_ACTION, UserThreadsLoadedAction } from '../action';
import { Actions } from '@ngrx/effects';
import { Effect } from '@ngrx/effects/src/effects_metadata';
import { Action } from '@ngrx/store/src/models';

@Injectable()
export class LoadThreadsEffectService {

  constructor(private threadService: ThreadsService,
              private actions$: Actions) {  }

  @Effect() userThreads$: Observable<Action> = this.actions$
                               .ofType(LOAD_USER_THREADS_ACTION)
                               .debug('action received')
                               .switchMap(() => this.threadService.loadUserThreads())
                               .debug('data received via HTTP request')
                               .map(allUserData => new UserThreadsLoadedAction(allUserData));
                               // No hay que hacer dispatch, esto lo hace el effect automáticamente

}
