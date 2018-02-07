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
import { ActionReducerMap } from '@ngrx/store/src/models';
import { EffectsModule } from '@ngrx/effects';
import { LoadThreadsEffectService } from './store/effects/load-threads-effect.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UiState, INITIAL_UI_STATE } from './store/ui-state';
import { StoreData, INITIAL_STORE_DATA } from './store/store-data';
import { uiState } from './store/reducers/uiStateReducer';
import { storeData } from './store/reducers/storeDataReducer';


export const reducers: ActionReducerMap<any> = {
  uiState,
  storeData
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
    StoreModule.forRoot(reducers, {initialState: INITIAL_APPLICATION_STATE}),
    EffectsModule.forRoot([LoadThreadsEffectService]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
