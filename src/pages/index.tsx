import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import TradesTable from '../components/TradesTable';
import { NextPage } from 'next';
import { TradesForm } from 'src/components/TradesForm';

const App: NextPage = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <TradesForm />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TradesTable />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default App;
