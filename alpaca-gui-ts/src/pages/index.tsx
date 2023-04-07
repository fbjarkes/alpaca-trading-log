import Stack from 'react-bootstrap/Stack';
import axios from 'axios';
import { NextPage } from 'next';
import { TradesForm } from 'src/components/TradesForm';
import { TradesTable } from 'src/components/TradesTable';
import { FormState, OpenTrade, Trade } from 'src/utils/types';
import { NumberSequence } from 'ag-grid-community';
import { useState } from 'react';

const data = Array.from({ length: 150 }, (_, i) => {
    const t = 100 + Math.random() * 100;
    return new Trade(
        `SPY`,
        10 + Math.floor(Math.random() * 10),
        t,
        Math.random() > 0.5 ? t + Math.random() * 20 : t - Math.random() * 20,
        'LONG',
        new Date(),
        new Date(),
    );
});

const URL = 'https://paper-api.alpaca.markets/v2/account/activities/FILL';
const PAGE_SIZE = 100;

const fetchActivities = async (start: string, end: string) => {
    const _fetch = async (page: string) => {
        try {
            console.log(`Fetching: page=${page}`);
            const res = await axios.get(URL, {
                headers: {
                    'APCA-API-KEY-ID': process.env.NEXT_PUBLIC_KEY_ID ?? '',
                    'APCA-API-SECRET-KEY': process.env.NEXT_PUBLIC_SECRET_KEY ?? '',
                },
                params: {
                    after: start,
                    until: end,
                    page_size: PAGE_SIZE,
                    page_token: page,
                },
            });
            return res.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    let trades: any[] = [];

    let res = await _fetch('');
    trades = trades.concat(res);
    while (res.length == PAGE_SIZE) {
        res = await _fetch(res[PAGE_SIZE - 1].id);
        trades = trades.concat(res);
    }
    return trades;
};

const connectTrades = (activities: any[], includeOpen: boolean): Trade[] => {
    const activeTrades = new Map<string, OpenTrade>();
    const trades: Trade[] = [];
    const incomplete: Trade[] = [];

    activities.reverse().forEach((act) => {
        // TODO: handle partial fills. Example:
        /**
         * {
            "id": "20220927123008292::3b6d33ff-521a-42e7-8935-d75930878aa7",
            "activity_type": "FILL",
            "transaction_time": "2022-09-27T16:30:08.292022Z",
            "type": "partial_fill",
            "price": "77.79",
            "qty": "55",
            "side": "sell_short",
            "symbol": "BABA",
            "leaves_qty": "32",
            "order_id": "80b7a103-15ea-41fc-946b-bcb60d7f74aa",
            "cum_qty": "55",
            "order_status": "partially_filled"
        }
         * {
            "id": "20220927123008566::86e3d6f6-7fea-4623-b3d2-4d4e1c0d8a22",
            "activity_type": "FILL",
            "transaction_time": "2022-09-27T16:30:08.566813Z",
            "type": "fill",
            "price": "77.79",
            "qty": "32",
            "side": "sell_short",
            "symbol": "BABA",
            "leaves_qty": "0",
            "order_id": "80b7a103-15ea-41fc-946b-bcb60d7f74aa",
            "cum_qty": "87",
            "order_status": "filled"
        }
         */
        if (activeTrades.has(act.symbol)) {
            const open = activeTrades.get(act.symbol);

            if (act.side === 'sell' && open?.direction === 'LONG') {
                if (open?.qty === parseFloat(act.qty)) {
                    // Close trade
                    const t = new Trade(
                        act.symbol,
                        open.qty,
                        open.price,
                        parseFloat(act.price),
                        'LONG',
                        new Date(open.entryDate),
                        new Date(act.transaction_time),
                    );
                    trades.push(t);
                    activeTrades.delete(act.symbol);
                } else {
                    // TODO: reduce
                }
            }

            if (act.side === 'buy' && open?.direction === 'SHORT') {
                if (open?.qty === parseFloat(act.qty)) {
                    // Close trade
                    const t = new Trade(
                        act.symbol,
                        open.qty,
                        open.price,
                        parseFloat(act.price),
                        'SHORT',
                        new Date(open.entryDate),
                        new Date(act.transaction_time),
                    );
                    trades.push(t);
                    activeTrades.delete(act.symbol);
                } else {
                    // TODO: reduce
                }
            }

            if (act.side === 'buy' && open?.direction === 'LONG') {
                // Assume current open is actually closed short, save incomplete trade and start a new open trade
                const t = new Trade(
                    open.symbol,
                    open.qty,
                    open.price,
                    open.price,
                    'LONG',
                    new Date(open.entryDate),
                    new Date(open.entryDate),
                );
                incomplete.push(t);
                activeTrades.set(act.symbol, {
                    symbol: act.symbol,
                    qty: parseFloat(act.qty),
                    price: parseFloat(act.price),
                    direction: act.side === 'sell_short' ? 'SHORT' : 'LONG',
                    entryDate: act.transaction_time,
                });
            }
        } else {
            // Open new Trade
            activeTrades.set(act.symbol, {
                symbol: act.symbol,
                qty: parseFloat(act.qty),
                price: parseFloat(act.price),
                direction: act.side === 'sell_short' ? 'SHORT' : 'LONG',
                entryDate: act.transaction_time,
            });
        }
    });
    console.log(
        `Connected ${trades.length} trades, ${incomplete.length} incomplete trades, and ${activeTrades.size} still active`,
    );
    if (includeOpen) {
        const openTrades = Array.from(activeTrades.values()).map(
            (active: OpenTrade) =>
                new Trade(
                    active.symbol,
                    active.qty,
                    active.price,
                    active.price,
                    active.direction === 'SHORT' ? 'SHORT' : 'N/A',
                    new Date(active.entryDate),
                    new Date(active.entryDate),
                ),
        );
        return trades.concat(incomplete).concat(openTrades);
    } else {
        return trades.concat(incomplete);
    }
};

const App: NextPage = () => {
    const [trades, setTrades] = useState<Trade[]>([]);

    const fetchTrades = async (input: FormState) => {
        console.log(`Fetch: start=${input.start}, end=${input.end}`);
        //TODO: move fetchActivities to 'data fetching methods' or 'API routes'?
        const activities = await fetchActivities(
            new Date(input.start).toISOString(),
            new Date(input.end).toISOString(),
        );
        console.log(`Got ${activities.length} actitivites`);
        const data = connectTrades(activities, input.includeOpen);
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
