import React, { useState } from 'react';
import Fee from './Fee';
import axios from 'axios';

const Transaction = () => {
    const [amount, setAmount] = useState(6984.89);

    const handleSubmit = () => {
        let config = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        let body = {
            "currency_send": "usd",
            "currency_receive": "btc",
            "amount": amount
        };

        axios.post('http://localhost:5000/api/transaction', body, config)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
    };

    const handleChange = (event) => {
        setAmount(event.target.value);
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <label>
            Amount:
            <input type="number" value={amount} onChange={handleChange} />
            </label>
            <br></br>
            <Fee Amount={amount} />
            <br></br>
            <input type="submit" value="COMPRAR" />
        </form>
        
    );
};

export default Transaction;