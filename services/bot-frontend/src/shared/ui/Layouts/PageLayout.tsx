import {Outlet} from 'react-router-dom';
import {Container} from '@mui/material';

export function PageLayout() {
    return (
        <Container maxWidth="md">
            <Outlet/>
        </Container>
    );
}
