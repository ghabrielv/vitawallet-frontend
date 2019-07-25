const initialState = {
    transactions: {
    	transactionList: [],
		newTransaction: {
            id: '',
            currency_receive: '',
            fee: '',
            commission: '',
            amount: '',
            total: '',
            created_at: ''
		},
	},
	ui: {
			isTransactionFormHidden: true
		}
}

export default initialState;