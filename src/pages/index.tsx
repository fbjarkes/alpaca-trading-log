import Stack from 'react-bootstrap/Stack';

import TradesTable from '../components/TradesTable';
import { NextPage } from 'next';
import { TradesForm } from 'src/components/TradesForm';

const App: NextPage = () => {
    return (
        <>
            <Stack gap={4}>
                <TradesForm />
                <TradesTable />
            </Stack>
        </>
    );
};

export default App;
