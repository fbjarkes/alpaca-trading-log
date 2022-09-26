import React, { ChangeEvent, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import 'react-datepicker/dist/react-datepicker.css';

export const TradesForm: React.FC<{}> = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setSendDate] = useState(new Date());

    return (
        <>
            <div
                className="Header"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'start',
                    gap: '10px',
                    marginTop: '10px',
                    marginBottom: '10px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'start',
                        gap: '2px',
                    }}
                >
                    <Form.Label htmlFor="basic-url">Start date</Form.Label>
                    <InputGroup className="mb-3">
                        <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} />
                        <Form.Control id="basic-url" aria-describedby="basic-addon3" />
                    </InputGroup>
                    <Form.Label htmlFor="basic-url">Start date</Form.Label>
                    <InputGroup className="mb-3">
                        <DatePicker selected={endDate} onChange={(date: Date) => setSendDate(date)} />
                        <Form.Control id="basic-url" aria-describedby="basic-addon3" />
                    </InputGroup>

                    <div>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};
