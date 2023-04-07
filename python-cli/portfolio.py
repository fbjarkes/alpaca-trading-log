import numpy as np
import pandas as pd
import datetime
import fire

class Trade:
    def __init__(self, symbol, qty, entry, exit, side, open_date, close_date, pnl):
        self.symbol = symbol
        self.qty = qty
        self.side = side
        self.pnl = pnl
        self.open_date = open_date
        self.close_date = close_date
        self.entry = entry
        self.exit = exit

class OpenTrade:
    
    def __init__(self, symbol, qty, side, open_date, entry_price):
        self.symbol = symbol
        self.qty = float(qty)
        self.side = side
        self.entry = float(entry_price[1:])
        self.date = datetime.datetime.strptime(open_date, '%Y-%m-%d %H:%M:%S')
        
class Portfolio:
    def __init__(self):
        self.trades = []
        
    def add_trade(self, trade):
        self.trades.append(trade)

def process_trades(csv_file):
    df = pd.read_csv(csv_file)
    df = df.sort_values('Filled at')
    # remove rows with no 'Filled at' date
    df = df[df['Filled at'].notna()]
    portfolio = Portfolio()

    open_trades = []
    for _, row in df.iterrows():
        if not row['Symbol'] or row['Symbol'] is np.nan:
            continue    
        print(f"Processing {row['Symbol']}: {row['Filled at']} {row['Submitted at']}")
        
        # check if open_trades contains a trade for this symbol
        tmp = [t for t in open_trades if t.symbol == row['Symbol']]
        if len(tmp) > 1:
            print(f"ERROR: more than one open trade for {row['Symbol']}")
        elif len(tmp) == 1:
            print(f"[*] Closing trade for {row['Symbol']}...")
            ot: OpenTrade = tmp[0]
            qty = float(row['Filled Qty'])
            exit_price = float(row['Filled Avg Price'][1:])
            closed_date = datetime.datetime.strptime(row['Filled at'], '%Y-%m-%d %H:%M:%S')
            if qty != ot.qty:
                print(f"ERROR: open trade qty does not match filled qty for {row['Symbol']}")
            else:                                                 
                if ot.side == 'LONG':
                    pnl = (exit_price - ot.entry) * qty
                else:
                    pnl = (ot.entry - exit_price) * qty
                trade = Trade(qty=qty, symbol=ot.symbol, entry=ot.entry, exit=exit_price, side=ot.side, open_date=ot.date, close_date=closed_date, pnl=pnl)
                print(f"CloseTrade: {trade.symbol} {trade.qty} {trade.side} {trade.entry} {trade.exit} {trade.open_date} {trade.close_date} {trade.pnl}")
                portfolio.add_trade(trade)
                open_trades.remove(ot)
        else:
            if row['Type'] == 'market':
                longShort = 'LONG' if row['Side'] == 'buy' else 'SHORT'
                open_trade = OpenTrade(row['Symbol'], row['Filled Qty'], longShort, open_date=row['Filled at'], entry_price=row['Filled Avg Price'])
                open_trades.append(open_trade)
                print(f"OpenTrade: {open_trade.symbol} {open_trade.qty} {open_trade.side} {open_trade.entry} {open_trade.date}")
            else:
                print(f"Skipping {row['Symbol']}: type={row['Type']} at={row['Filled at']}, side={row['Side']}, qty={row['Qty']} since it is not a market order")
    
        
    for trade in portfolio.trades:
        print(f"Trade: {trade.symbol} {trade.qty} {trade.side} {trade.entry} {trade.exit} {trade.open_date} {trade.close_date} {trade.pnl}")
    print(f"Total PnL: {sum([t.pnl for t in portfolio.trades])} ({len(portfolio.trades)} trades")

if __name__ == '__main__':
    fire.Fire(process_trades, 'test.csv')
