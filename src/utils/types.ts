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

    constructor(symbol: string, quantity: number, entryPrice: number, exitPrice: number) {
        this.symbol = symbol;
        this.quantity = quantity;
        this.entryPrice = entryPrice;
        this.exitPrice = exitPrice;
        this.pnl = (this.exitPrice - this.entryPrice) * this.quantity;
    }
}
