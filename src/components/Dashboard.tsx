import React from 'react';

import styles from '../styles/Dashboard.module.css';

function Dashboard() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span className={styles.myText}>fOO</span>
            <h2>HELLO THERE</h2>
        </div>
    );
}

export default Dashboard;
