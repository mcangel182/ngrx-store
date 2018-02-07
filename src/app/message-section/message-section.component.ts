import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../store/application-state';
import { Observable } from 'rxjs/Observable';
import { MessageVM } from './message.vm';
import { messageParticipantNamesSelector } from './messageParticipantNamesSelector';
import { messagesSelector } from './messagesSelector';

@Component({
  selector: 'message-section',
  templateUrl: './message-section.component.html',
  styleUrls: ['./message-section.component.css']
})
export class MessageSectionComponent implements OnInit {

  participantNames$: Observable<string>;
  messages$: Observable<MessageVM[]>;

  constructor(private store: Store<ApplicationState>) {
    //store.subscribe();
    //store.subscribe(state => console.log('message section received state', state));
    this.participantNames$ = store.select(messageParticipantNamesSelector);
    this.messages$ = store.select(messagesSelector);
  }

  ngOnInit() {
  }

}
