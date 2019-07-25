import React, { useState } from 'react';
import Fee from './Fee';
import axios from 'axios';
import CurrencyInput from 'react-currency-input';
import { Alert, Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle, Label, Button } from 'reactstrap';
import configureStore  from '../store/configureStore';
import { handleInputChange, handleInputChangeJson, addTransaction } from '../actions';

const store = configureStore();

store.subscribe(() =>
    console.log(store.getState())
)

const Transaction = () => {
    const [amount, setAmount] = useState('6984,89');
    const [message, setMessage] = useState('');

    let usd = parseFloat(amount.toString().replace('.', '').replace(',', '.'));

    store.dispatch(handleInputChange('currency_receive', 'btc'))
    store.dispatch(handleInputChange('commission', 0))
    store.dispatch(handleInputChange('amount', usd))
    
    const handleClick = () => {
        let config = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        let body = {
            "currency_send": 'usd',
            "currency_receive": store.getState().transactions.newTransaction.currency_receive,
            "amount": store.getState().transactions.newTransaction.amount
        };
        axios.post('http://localhost:5000/api/transaction', body, config)
        .then((res) => {
            store.dispatch(handleInputChangeJson(res.data))
            store.dispatch(addTransaction())
            setMessage('Exchange done');
        })
        .catch((err) => {
            setMessage('Exchange fail');
        })
    };

    const handleChange = (event) => {
        setAmount(event.target.value);
    }
    
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <br></br>
                    <Card>
                        <CardBody>
                            <CardTitle>
                                <Label for="amount" color="blue">Send in USD</Label>
                                <div><CurrencyInput decimalSeparator="," thousandSeparator="." precision="2" value={amount} onChangeEvent={handleChange}/></div>
                            </CardTitle>
                            <CardSubtitle>
                                <Label for="receive">Receive in BTC</Label><br></br>
                                <Fee Amount={amount} />
                            </CardSubtitle>
                            <Alert color="light">{message}</Alert>
                            <Button color="info" onClick={handleClick}>BUY</Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
      </Container>
    );
};

export default Transaction;