import { ThreadSelectedAction } from './../action';
import { Effect } from '@ngrx/effects/src/effects_metadata';
import { ThreadsService } from './../../services/threads.service';
import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { THREAD_SELECTED_ACTION } from '../action';

@Injectable()
export class MarkMessagesAsReadEffectService {

  constructor(private threadService: ThreadsService,
              private actions$: Actions) { }
  
  @Effect({dispatch: false}) markMessagesAsRead$ = this.actions$.ofType(THREAD_SELECTED_ACTION)
                                               .switchMap((action: ThreadSelectedAction) => this.threadService.markMessageAsRead(action.payload.currentUserId, action.payload.selectedThreadId));

}
