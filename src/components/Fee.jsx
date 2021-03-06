import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrencyInput from 'react-currency-input';
import { handleInputChange } from '../actions';
import { API_ROOT } from '../api-config';

const Fee = (st) => {
  const store = st.store;

  const [fee, changeFee] = useState(store.getState().transactions.newTransaction.fee);

  useEffect(
    () => {
      getFee();
    },
    [st]
  );

  const getFee = () => {
    axios.get(API_ROOT + '/fee').then(res => {
      changeFee(res.data);
    });
  };

  if (fee === undefined) return null;

  store.dispatch(handleInputChange('fee', fee.btc_buy));

  let r = (store.getState().transactions.newTransaction.amount / fee.btc_buy).toFixed(9);
  r = r.toString().substring(0, (r.length - 1));
  r = parseFloat(r);

  store.dispatch(handleInputChange('total', r));

  return (
    <CurrencyInput decimalSeparator="," thousandSeparator="." precision="8" value={store.getState().transactions.newTransaction.total}/>
  );

}

export default Fee;