import React from 'react';
import Button from 'react-bootstrap/Button';

import styles from '../styles/Dashboard.module.css';

function Dashboard() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span className={styles.myText}>HELLO WORLD</span>
            <Button>Button</Button>
        </div>
    );
}

export default Dashboard;
