import { INITIAL_UI_STATE, UiState } from '../ui-state';
import { Action } from '@ngrx/store';
import { THREAD_SELECTED_ACTION, SELECT_USER_ACTION, SelectUserAction } from '../action';


export function uiState(state: UiState = INITIAL_UI_STATE, action: Action): UiState {
  switch (action.type) {

    case THREAD_SELECTED_ACTION:
      const newState = Object.assign({}, state);
      newState.currentThreadId = action.payload.selectedThreadId;
      return newState;

    case SELECT_USER_ACTION:
      return handleSelectedUserAction(state, action);

    default:
      return state;
  }
}

function handleSelectedUserAction(state: UiState, action: SelectUserAction) {
  const newUiState = Object.assign({}, state);
  newUiState.currentThreadId = undefined;
  newUiState.userId = action.payload;
  return newUiState;
}
