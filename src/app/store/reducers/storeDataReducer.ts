import { INITIAL_STORE_DATA, StoreData } from '../store-data';
import { USER_THREADS_LOADED_ACTION, UserThreadsLoadedAction } from '../action';
import { Action } from '@ngrx/store';
import * as _ from 'lodash';

export function storeData(state: StoreData = INITIAL_STORE_DATA, action: Action): StoreData {
    switch (action.type) {
        case USER_THREADS_LOADED_ACTION:
            return handleLoadUserThreadsAction(state, action);
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
