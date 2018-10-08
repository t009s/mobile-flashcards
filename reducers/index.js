import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions'

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK:
      const deck = {
        ...state,
        [action.deckTitle]: {
          title: action.deckTitle,
          questions: []
        }
      }
      return deck    
    case ADD_CARD:
      const card = {
        ...state
      }
      if (card[action.deckTitle]) {
        const {question, answer} = action.card
        card[action.deckTitle].questions.push({question, answer})
      }
      return card
    default:
      return state
  }
}

export default decks
