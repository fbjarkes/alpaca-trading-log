export class Trade {
    entryDate: Date;
    exitDate: Date;
    symbol: string;
    description: string;
    quantity: number;
    entryPrice: number;
    exitPrice: number;
    pnl: number;
    securityType: string;
    currency: string;
    side: string;
    commission: number;

    constructor(
        symbol: string,
        quantity: number,
        entryPrice: number,
        exitPrice: number,
        side: string,
        entryDate: Date,
        exitDate: Date,
    ) {
        this.symbol = symbol;
        this.quantity = quantity;
        this.entryPrice = entryPrice;
        this.exitPrice = exitPrice;
        this.side = side;
        this.entryDate = entryDate;
        this.exitDate = exitDate;
        if (side === 'SHORT') {
            this.pnl = (this.entryPrice - this.exitPrice) * this.quantity;
        } else {
            this.pnl = (this.exitPrice - this.entryPrice) * this.quantity;
        }
    }
}

export type OpenTrade = {
    symbol: string;
    qty: number;
    price: number;
    direction: string;
    entryDate: string;
};
