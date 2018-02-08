import { INITIAL_UI_STATE, UiState } from '../ui-state';
import { Action } from '@ngrx/store';
import { THREAD_SELECTED_ACTION, SELECT_USER_ACTION } from '../action';
import { SelectUserAction } from '../../user-selection/action';

export function uiState(state: UiState = INITIAL_UI_STATE, action: Action): UiState {
  switch (action.type) {

    case THREAD_SELECTED_ACTION:
      const newState = Object.assign({}, state);
      newState.currentThreadId = action.payload;
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
