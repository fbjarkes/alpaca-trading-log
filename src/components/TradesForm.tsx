import React, { ChangeEvent, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import 'react-datepicker/dist/react-datepicker.css';

export const TradesForm: React.FC<{}> = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setSendDate] = useState(new Date());

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} />
                    </Col>
                    <Col>
                        <DatePicker selected={endDate} onChange={(date: Date) => setSendDate(date)} />
                    </Col>
                </Row>
                <Row>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Row>
            </Container>
        </>
    );
};
