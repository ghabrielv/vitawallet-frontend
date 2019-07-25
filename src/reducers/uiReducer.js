import initialState from './initialState';

export default function uiReducer(state = initialState.ui, action) {
    switch(action.type) {
        
        case "TOGGLE_TRANSACTION_FORM": {
				return {
					...state, isTransactionFormHidden: !state.isTransactionFormHidden
					}
				
			}
		default: return state;
	}
}