export const addTransaction = () => {
    return {
		type: "ADD_TRANSACTION",
		
	}
}

export const handleInputChange = (name, value) => {
	return {
		type: "HANDLE_INPUT_CHANGE",
		payload: { [name]: value }
	}
}

export const handleInputChangeJson = (json) => {
	return {
		type: "HANDLE_INPUT_CHANGE",
		payload: json.data
	}
}