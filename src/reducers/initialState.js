const initialState = {
    transactions: {
    	transactionList: [],
		newTransaction: {
                  id: '',
                  currency_send: 'usd',
                  currency_receive: 'btc',
                  fee: '',
                  commission: 0,
                  amount: '6984,89',
                  total: '',
                  created_at: ''
		},
	}
}

export default initialState;