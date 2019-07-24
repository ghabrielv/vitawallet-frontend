import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  let r = amount.Amount * fee.btc_buy;

  return (
    <label>Receive: {r}</label>
  );

}

export default Fee;