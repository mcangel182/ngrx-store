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
                               .do(val => console.log('action received', val))
                               .switchMap(() => this.threadService.loadUserThreads())
                               .do(val => console.log('data received via HTTP request', val))
                               .map(allUserData => new UserThreadsLoadedAction(allUserData));
                               // No hay que hacer dispatch, esto lo hace el effect automáticamente

}
