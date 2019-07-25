import initialState from './initialState';

export default function transactionReducer(state = initialState.transactions, action) {
    switch(action.type) {
     
		case 'ADD_TRANSACTION': {
			return {
				...state,
				transactionList: [...state.transactionList, state.newTransaction]
			}
		}

		case 'HANDLE_INPUT_CHANGE': {
			
			return {
				...state, newTransaction: {
					...state.newTransaction, ...action.payload }
			}
		}

		default: return state;
	}
}