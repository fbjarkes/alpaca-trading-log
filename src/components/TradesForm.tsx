import React, { ChangeEvent, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import 'react-datepicker/dist/react-datepicker.css';

export const TradesForm: React.FC<{}> = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setSendDate] = useState(new Date());

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
                        <DatePicker selected={endDate} onChange={(date: Date) => setSendDate(date)} />
                    </div>
                </div>
                <div className="vr" />
                <div className="">
                    <Button variant="secondary">Submit</Button>
                </div>
            </Stack>
        </>
    );
};
