import { AgGridReact } from 'ag-grid-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import styles from '../styles/Dashboard.module.css';
import { Trade } from 'src/utils/types';

export const TradesTable: React.FC<{ trades: Trade[] }> = ({ trades }) => {
    const [columnDefs] = useState([
        { field: 'entryDate', sortable: true, filter: true },
        { field: 'exitDate', sortable: true, filter: true },
        { field: 'symbol', sortable: true, filter: true, minWidth: 100 },
        { field: 'quantity', sortable: true, filter: 'agNumberColumnFilter' },
        { field: 'side', sortable: true, filter: true },
        { field: 'pnl', sortable: true, filter: 'agNumberColumnFilter' },
    ]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="ag-theme-alpine" style={{ width: '100%', height: 1000 }}>
                <AgGridReact rowData={trades} columnDefs={columnDefs} pagination={true}></AgGridReact>
            </div>
        </div>
    );
};
