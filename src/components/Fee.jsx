import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrencyInput from 'react-currency-input';

const Fee = (amount) => {
  const [fee, changeFee] = useState(undefined);

  useEffect(
    () => {
      getFee();
    },
    [amount]
  );

  const getFee = () => {
    axios.get('http://localhost:5000/api/fee').then(res => {
      changeFee(res.data);
    });
  };

  if (fee === undefined) return null;

  let usd = (amount.Amount).toString().replace('.', '').replace(',', '.');
  let r = ((parseFloat(usd) / fee.btc_buy)).toFixed(9);
  r = r.toString().substring(0, (r.length - 1));
  r = parseFloat(r);

  return (
    <div>
      <label>Receive BTC: </label>
      <CurrencyInput decimalSeparator="," thousandSeparator="." precision="8" value={r}/>
    </div>
  );

}

export default Fee;