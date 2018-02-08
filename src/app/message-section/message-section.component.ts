import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../store/application-state';
import { Observable } from 'rxjs/Observable';
import { MessageVM } from './message.vm';
import { messageParticipantNamesSelector } from './messageParticipantNamesSelector';
import { messagesSelector } from './messagesSelector';
import { SendNewMessageAction } from '../store/action';
import { UiState } from '../store/ui-state';

@Component({
  selector: 'message-section',
  templateUrl: './message-section.component.html',
  styleUrls: ['./message-section.component.css']
})
export class MessageSectionComponent implements OnInit {

  participantNames$: Observable<string>;
  messages$: Observable<MessageVM[]>;
  uiState: UiState;

  constructor(private store: Store<ApplicationState>) {
    //store.subscribe();
    //store.subscribe(state => console.log('message section received state', state));
    this.participantNames$ = store.select(messageParticipantNamesSelector);
    this.messages$ = store.select(messagesSelector);
    this.store.subscribe(state => this.uiState = Object.assign({}, state.uiState));
  }

  ngOnInit() {
  }

  onNewMessage(input: any) {
    this.store.dispatch(new SendNewMessageAction({
      text: input.value,
      threadId: this.uiState.currentThreadId,
      participantId: this.uiState.userId
    }));
    input.value = '';
  }

}
