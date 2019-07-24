import React, { useState } from 'react';
import Fee from './Fee';
import axios from 'axios';
import CurrencyInput from 'react-currency-input';

const Transaction = () => {
    const [amount, setAmount] = useState('6984,89');

    const handleClick = () => {
        let usd = parseFloat(amount.toString().replace('.', '').replace(',', '.'));
        let config = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        let body = {
            "currency_send": "usd",
            "currency_receive": "btc",
            "amount": usd
        };
        axios.post('http://localhost:5000/api/transaction', body, config)
        .then((res) => {
            console.log(res.data);
            alert('Intercambio realizado correctamente.');
        })
        .catch((err) => {
            console.log(err);
        })
    };

    const handleChange = (event) => {
        setAmount(event.target.value);
    }
    
    return (
        <div>
            <label>Amount USD: </label>
            <CurrencyInput decimalSeparator="," thousandSeparator="." precision="2" value={amount} onChangeEvent={handleChange}/>
            <br></br>
            <Fee Amount={amount} />
            <button onClick={handleClick}>COMPRAR</button>
        </div>
    );
};

export default Transaction;