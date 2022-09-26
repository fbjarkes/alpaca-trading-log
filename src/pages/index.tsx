import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import TradesTable from '../components/TradesTable';
import { NextPage } from 'next';
import { TradesForm } from 'src/components/TradesForm';

const App: NextPage = () => {
    return (
        <>
            <Container
                fluid
                className="App"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    height: '100%',
                    width: '100%',
                    maxWidth: '1000px',
                    margin: 'auto',
                }}
            >
                <div style={{ flexShrink: '0' }}>
                    <TradesForm />
                </div>
                <div style={{ flex: '1 0 auto', height: '100%' }}>
                    <TradesTable />
                </div>
            </Container>
        </>
    );
};

export default App;
