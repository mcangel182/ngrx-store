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

@Component({
  selector: 'thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent {

  userName$: Observable<string>;
  unreadMessagesCounter$: Observable<number>;
  threadSummaries$: Observable<ThreadSummaryVM[]>;
  currentSelectedThreadId$: Observable<number>;

  constructor(private store: Store<ApplicationState>,
              private threadService: ThreadsService) {

    this.userName$ = store.select(userNameSelector);
    this.unreadMessagesCounter$ = store.map(mapStateToUnreadMessagesCounter);
    this.threadSummaries$ = store.select(stateToThreadSummaries);
    this.currentSelectedThreadId$ = store.select(state => state.uiState.currentThreadId);
  }

  onThreadSelected(selectedThreadId: number) {
    this.store.dispatch(new ThreadSelectedAction(selectedThreadId));
  }

}
