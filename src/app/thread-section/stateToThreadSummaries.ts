import { ApplicationState } from "../store/application-state";
import { ThreadSummaryVM } from "./thread-summary.vm";
import { Thread } from "../../../shared/model/thread";
import { buildThreadParticipantsList } from "../shared/mapping/buildThreadParticipantsList";
import * as _ from 'lodash';

export function stateToThreadSummaries(state: ApplicationState): ThreadSummaryVM[] {
    const threads = _.values(state.storeData.threads);
    return threads.map(_.partial(mapThreadToThreadSummariey, state));
  }

  function mapThreadToThreadSummariey(state: ApplicationState, thread: Thread): ThreadSummaryVM {
      const lastMessageId = _.last(thread.messageIds);
      const lastMessage = state.storeData.messages[lastMessageId];
      return {
        id: thread.id,
        participantNames: buildThreadParticipantsList(state, thread),
        lastMessageText: state.storeData.messages[lastMessageId].text,
        timestamp: lastMessage.timestamp,
        read: thread.id === state.uiState.currentThreadId || thread.participants[state.uiState.userId] === 0
      };
  }
