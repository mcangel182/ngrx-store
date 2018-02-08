import { INITIAL_STORE_DATA, StoreData } from '../store-data';
import { USER_THREADS_LOADED_ACTION, UserThreadsLoadedAction,
         SEND_NEW_MESSAGE_ACTION, SendNewMessageAction,
         NEW_MESSAGES_RECEIVED_ACTION, NewMessagesReceivedAction } from '../action';
import { Action } from '@ngrx/store';
import { Message } from '../../../../shared/model/message';
import * as _ from 'lodash';

const uuid = require('uuid/V4');

export function storeData(state: StoreData = INITIAL_STORE_DATA, action: Action): StoreData {
    switch (action.type) {
        case USER_THREADS_LOADED_ACTION:
            return handleLoadUserThreadsAction(state, action);
        case SEND_NEW_MESSAGE_ACTION:
            return handleSendNewMessageAction(state, action);
        case NEW_MESSAGES_RECEIVED_ACTION:
            return handleNewMessagesReceivedAction(state, action);
        default:
            return state;
    }
}

function handleLoadUserThreadsAction(state: StoreData, action: UserThreadsLoadedAction): StoreData {
    return {
        participants: _.keyBy(action.payload.participants, 'id'),
        threads: _.keyBy(action.payload.threads, 'id'),
        messages: _.keyBy(action.payload.messages, 'id')
    };
}

function handleSendNewMessageAction(state: StoreData, action: SendNewMessageAction) {
    const newStoreState = _.cloneDeep(state); // Object.assign({}, state); doesn't do a deep copy
    const currentThread = newStoreState.threads[action.payload.threadId];
    const newMessage: Message = {
        id: uuid(),
        threadId: action.payload.threadId,
        participantId: action.payload.participantId,
        text: action.payload.text,
        timestamp: new Date().getTime()
    };
    currentThread.messageIds.push(newMessage.id);
    newStoreState.messages[newMessage.id] = newMessage;
    return newStoreState;
}

function handleNewMessagesReceivedAction(state: StoreData, action: NewMessagesReceivedAction) {
    const newStoreState = _.cloneDeep(state);
    const newMessages = action.payload;
    newMessages.forEach(message => {
        newStoreState.messages[message.id] = message;
        newStoreState.threads[message.threadId].messageIds.push(message.id);
    });

    return newStoreState;
}
