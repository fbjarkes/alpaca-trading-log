import { AgGridReact } from 'ag-grid-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import styles from '../styles/Dashboard.module.css';
import { Trade } from 'src/utils/types';

const data = Array.from({ length: 150 }, (_, i) => {
    const t = 100 + Math.random() * 100;
    return new Trade(
        `SPY`,
        10 + Math.floor(Math.random() * 10),
        t,
        Math.random() > 0.5 ? t + Math.random() * 20 : t - Math.random() * 20,
    );
});

function TradesTable() {
    const [rowData, setRowData] = useState(data);

    const [columnDefs] = useState([
        { field: 'symbol', sortable: true, filter: true, minWidth: 150 },
        { field: 'quantity', sortable: true, filter: 'agNumberColumnFilter' },
        { field: 'pnl', sortable: true, filter: 'agNumberColumnFilter' },
    ]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="ag-theme-alpine" style={{ width: '100%', height: 1000 }}>
                <AgGridReact rowData={rowData} columnDefs={columnDefs} pagination={true}></AgGridReact>
            </div>
        </div>
    );
}

export default TradesTable;
