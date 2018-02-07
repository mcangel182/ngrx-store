import { ApplicationState } from "../store/application-state";
import * as _ from 'lodash';
import { ThreadSummaryVM } from "./thread-summary.vm";
import { Thread } from "../../../shared/model/thread";

export function stateToThreadSummaries(state: ApplicationState): ThreadSummaryVM[] {
    const threads = _.values(state.loadUserThreads.storeData.threads);
    return threads.map(_.partial(mapThreadToThreadSummariey, state));
  }

  function mapThreadToThreadSummariey(state: ApplicationState, thread: Thread): ThreadSummaryVM {
    const names = _.keys(thread.participants).map(participantId => state.loadUserThreads.storeData.participants[participantId].name);
      const lastMessageId = _.last(thread.messageIds);
      const lastMessage = state.loadUserThreads.storeData.messages[lastMessageId];
      return {
        id: thread.id,
        participantNames: _.join(names, ', '),
        lastMessageText: state.loadUserThreads.storeData.messages[lastMessageId].text,
        timestamp: lastMessage.timestamp
      };
  }
