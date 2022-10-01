import React, { ChangeEvent, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import 'react-datepicker/dist/react-datepicker.css';

export const TradesForm: React.FC<{ fetchTrades(start: number, end: number): void }> = ({ fetchTrades }) => {
    const today = new Date();
    const [startDate, setStartDate] = useState(new Date(new Date().setDate(today.getDate() - 7)));
    const [endDate, setEndDate] = useState(today);

    return (
        <>
            <Stack direction="horizontal" gap={3}>
                <div className="box">
                    <div className="label">Start date:</div>
                    <div>
                        <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} />
                    </div>
                </div>
                <div className="box">
                    <div className="label">End date:</div>
                    <div>
                        <DatePicker selected={endDate} onChange={(date: Date) => setEndDate(date)} />
                    </div>
                </div>
                <div className="vr" />
                <div className="">
                    <Button
                        variant="secondary"
                        onClick={() => {
                            fetchTrades(startDate.getTime(), endDate.getTime());
                        }}
                    >
                        Submit
                    </Button>
                </div>
            </Stack>
        </>
    );
};
