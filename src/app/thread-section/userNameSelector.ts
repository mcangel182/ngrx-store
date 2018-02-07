import { ApplicationState } from '../store/application-state';

export function userNameSelector(state: ApplicationState): string {
    const currentUserId = state.loadUserThreads.uiState.userId,
        currentParticipant = state.loadUserThreads.storeData.participants[currentUserId]
    if (!currentParticipant) {
        return '';
    }
    return state.loadUserThreads.storeData.participants[state.loadUserThreads.uiState.userId].name;
}
