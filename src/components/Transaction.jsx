import React, { useState } from 'react';
import Fee from './Fee';
import axios from 'axios';
import CurrencyInput from 'react-currency-input';
import { Alert, Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardText, Label, Button } from 'reactstrap';
import configureStore  from '../store/configureStore';
import { handleInputChange, addTransaction } from '../actions';

const store = configureStore();

store.subscribe(() =>
    console.log(store.getState())
)

const Transaction = () => {
    const [amount, setAmount] = useState('6984,89');
    const [message, setMessage] = useState('');

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
            store.dispatch(handleInputChange(res.data))
            store.dispatch(addTransaction())
            setMessage('Intercambio realizado.');
        })
        .catch((err) => {
            setMessage('Intercambio no realizado.');
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
                            <Label for="amount">Amount USD</Label>
                            <div><CurrencyInput decimalSeparator="," thousandSeparator="." precision="2" value={amount} onChangeEvent={handleChange}/></div>
                        </CardTitle>
                        <CardSubtitle>
                            <Label for="receive">Receive BTC</Label><br></br>
                            <Fee Amount={amount} />
                        </CardSubtitle>
                        <CardText>
                            <Alert color="light">
                                {message}
                            </Alert>
                        </CardText>
                        <Button color="info" onClick={handleClick}>COMPRAR</Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
      </Container>
    );
};

export default Transaction;