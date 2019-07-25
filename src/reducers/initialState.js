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
	}
}

export default initialState;