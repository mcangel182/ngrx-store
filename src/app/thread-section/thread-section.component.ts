import { Component, OnInit } from '@angular/core';
import { ThreadsService } from '../services/threads.service';
import { Store } from '@ngrx/store';
import { UserThreadsLoadedAction, LoadUserThreadsAction } from '../store/action';
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
export class ThreadSectionComponent implements OnInit {

  userName$: Observable<string>;
  unreadMessagesCounter$: Observable<number>;
  threadSummaries$: Observable<ThreadSummaryVM[]>;

  constructor(private store: Store<ApplicationState>,
              private threadService: ThreadsService) {

    this.userName$ = store.select(userNameSelector);
    this.unreadMessagesCounter$ = store.map(mapStateToUnreadMessagesCounter);
    this.threadSummaries$ = store.select(stateToThreadSummaries);
  }

  ngOnInit() {
    this.store.dispatch(new LoadUserThreadsAction());
    /*this.threadService.loadUserThreads()
                      .subscribe(
                        allUserData => this.store.dispatch(
                          new UserThreadsLoadedAction(allUserData)
                        )
                      );*/
  }

}
