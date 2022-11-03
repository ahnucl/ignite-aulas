import { produce } from 'immer'

import { ActionTypes, CycleActions } from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date | string
  interruptDate?: Date | string
  endDate?: Date | string
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CyclesState, action: CycleActions) {
  /**
   * state -> Estado atual (current)
   * action -> Ações que o usuário pode realizar para modificar o estado
   */

  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })

    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )

      if (currentCycleIndex < 0) {
        return state
      }

      /**
       *  Não pode haver outra lógica senão a de alteração do draft dentro do produce?
       */

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].interruptDate = new Date()
        draft.activeCycleId = null
      })
    }

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, endDate: new Date() }
          } else {
            return cycle
          }
        }),
        activeCycleId: null,
      }

    default:
      return state
  }
}
