import { AgGridReact } from 'ag-grid-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import styles from '../styles/Dashboard.module.css';

function Dashboard() {
    // TODO: make sure ag-grid community supports all data types needed, both sorting, filtering, presentation and 100+ rows or pagination
    const [rowData] = useState([
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxster', price: 72000 },
    ]);

    const [columnDefs] = useState([
        { field: 'price', sortable: true, filter: 'agNumberColumnFilter' },
        { field: 'make', sortable: true, filter: true },
        { field: 'model', sortable: true, filter: true },
    ]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Button>HELLO</Button>
            <div className="ag-theme-alpine" style={{ width: 500, height: 500 }}>
                <AgGridReact rowData={rowData} columnDefs={columnDefs}></AgGridReact>
            </div>
        </div>
    );
}

export default Dashboard;
