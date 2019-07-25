import React, { useState } from 'react';
import axios from 'axios';
import CurrencyInput from 'react-currency-input';
import { Alert, Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle, Label, Button } from 'reactstrap';
import { connect } from 'react-redux';
import Fee from './Fee';
import configureStore  from '../store/configureStore';
import { handleInputChange, handleInputChangeJson, addTransaction } from '../actions';

const store = configureStore();

store.subscribe(() =>
    console.log(store.getState())
)

const Transaction = (props) => {
    const [amount, setAmount] = useState(props.newTransaction.amount);
    const [message, setMessage] = useState('');

    let usd = parseFloat(amount.toString().replace('.', '').replace(',', '.'));

    store.dispatch(handleInputChange('amount', usd))
    
    const handleClick = () => {
        let config = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        let body = {
            "currency_send": props.newTransaction.currency_send,
            "currency_receive": props.newTransaction.currency_receive,
            "amount": usd
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
                                <Label for="amount" color="blue">Send in {props.newTransaction.currency_send.toUpperCase()}</Label>
                                <div><CurrencyInput decimalSeparator="," thousandSeparator="." precision="2" value={amount} onChangeEvent={handleChange}/></div>
                            </CardTitle>
                            <CardSubtitle>
                                <Label for="receive">Receive in {props.newTransaction.currency_receive.toUpperCase()}</Label><br></br>
                                <Fee store={store} />
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

const mapStateToProps = (state) => {
    return {
        newTransaction: state.transactions.newTransaction
    }
}

const mapDispatchToProps = () => {
    return {
        type: 'ADD_TRANSACTION'
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);