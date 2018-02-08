import { UiState } from './../store/ui-state';
import { Component, OnInit } from '@angular/core';
import { ThreadsService } from '../services/threads.service';
import { Store } from '@ngrx/store';
import { UserThreadsLoadedAction, LoadUserThreadsAction, ThreadSelectedAction } from '../store/action';
import { Observable } from 'rxjs/Observable';
import { mapStateToUnreadMessagesCounter } from './mapStateToUnreadMessagesCounter';
import { stateToThreadSummaries } from './stateToThreadSummaries';
import { userNameSelector } from './userNameSelector';
import { ThreadSummaryVM } from './thread-summary.vm';
import { ApplicationState } from '../store/application-state';
import * as _ from 'lodash';
import { uiState } from '../store/reducers/uiStateReducer';

@Component({
  selector: 'thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent {

  userName$: Observable<string>;
  unreadMessagesCounter$: Observable<number>;
  threadSummaries$: Observable<ThreadSummaryVM[]>;
  uiState: UiState;

  constructor(private store: Store<ApplicationState>,
              private threadService: ThreadsService) {

    this.userName$ = store.select(userNameSelector);
    this.unreadMessagesCounter$ = store.map(mapStateToUnreadMessagesCounter);
    this.threadSummaries$ = store.select(stateToThreadSummaries);
    store.select(state => state.uiState).subscribe(uiState => this.uiState = _.cloneDeep(uiState));
  }

  onThreadSelected(selectedThreadId: number) {
    this.store.dispatch(new ThreadSelectedAction({selectedThreadId, currentUserId: this.uiState.userId}));
  }

}
