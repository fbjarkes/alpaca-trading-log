import Stack from 'react-bootstrap/Stack';

import { NextPage } from 'next';
import { TradesForm } from 'src/components/TradesForm';
import { TradesTable } from 'src/components/TradesTable';
import { Trade } from 'src/utils/types';
import { NumberSequence } from 'ag-grid-community';
import { useState } from 'react';

const data = Array.from({ length: 150 }, (_, i) => {
    const t = 100 + Math.random() * 100;
    return new Trade(
        `SPY`,
        10 + Math.floor(Math.random() * 10),
        t,
        Math.random() > 0.5 ? t + Math.random() * 20 : t - Math.random() * 20,
    );
});

const App: NextPage = () => {
    const [trades, setTrades] = useState<Trade[]>([]);

    const fetchTrades = (start: number, end: number): void => {
        console.log(`Fetch: start=${start}, end=${end}`);
        setTrades(data);
    };

    return (
        <>
            <Stack gap={4}>
                <TradesForm fetchTrades={fetchTrades} />
                <TradesTable trades={trades} />
            </Stack>
        </>
    );
};

export default App;
