import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserSelectionComponent } from './user-selection/user-selection.component';
import { ThreadSectionComponent } from './thread-section/thread-section.component';
import { MessageSectionComponent } from './message-section/message-section.component';
import { ThreadListComponent } from './thread-list/thread-list.component';
import { MessageListComponent } from './message-list/message-list.component';
import { ThreadsService } from './services/threads.service';
import { StoreModule } from '@ngrx/store';
import { INITIAL_APPLICATION_STATE, ApplicationState } from './store/application-state';
import { Action } from '@ngrx/store';
import { LOAD_USER_THREADS_ACTION, LoadUserThreadsAction, USER_THREADS_LOADED_ACTION } from './store/action';
import * as _ from 'lodash';
import { ActionReducerMap } from '@ngrx/store/src/models';
import { EffectsModule } from '@ngrx/effects';
import { LoadThreadsEffectService } from './store/effects/load-threads-effect.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

function storeReducer(state: ApplicationState = INITIAL_APPLICATION_STATE, action: Action): ApplicationState {
  switch (action.type) {
    case USER_THREADS_LOADED_ACTION:
      return handleLoadUserThreadsAction(state, action);
    default:
      return state;
  }
}

function handleLoadUserThreadsAction(state: ApplicationState, action: LoadUserThreadsAction): ApplicationState {
  const userData = action.payload;
  const newState: ApplicationState = Object.assign({}, state);

  newState.storeData = {
    participants: _.keyBy(userData.participants, 'id'),
    threads: _.keyBy(userData.threads, 'id'),
    messages: _.keyBy(userData.messages, 'id')
  };

  return newState;
}

export const reducers: ActionReducerMap<any> = {
  loadUserThreads: storeReducer
};

@NgModule({
  declarations: [
    AppComponent,
    UserSelectionComponent,
    ThreadSectionComponent,
    MessageSectionComponent,
    ThreadListComponent,
    MessageListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([LoadThreadsEffectService]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
