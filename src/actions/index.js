export const addTransaction = () => {
    return {
		type: "ADD_TRANSACTION",
		
	}
}

export const handleInputChange = (json) => {
	return {
		
		type: "HANDLE_INPUT_CHANGE",
		payload: json.data
	}
}

export const toggleTransactionForm = () => {
	return {
		type: "TOGGLE_TRANSACTION_FORM",
	}
}