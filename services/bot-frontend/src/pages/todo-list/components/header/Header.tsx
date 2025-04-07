import {FormEvent} from 'react';
import {Box, Button, TextField, Grid} from '@mui/material';

type HeaderProps = {
    onSearch: (title: string) => void;
};

export function Header({onSearch}: HeaderProps) {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const title = formData.get('title') as string;
        onSearch(title);
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Grid
                container
                spacing={2}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Grid size={6}>
                    <TextField
                        size="small"
                        type="text"
                        fullWidth
                        label="Enter title"
                        variant="outlined"
                        name="title"
                    />
                </Grid>
                <Grid size={3}>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        size="medium"
                        fullWidth
                    >
                        Search
                    </Button>
                </Grid>
                <Grid size={3}>
                    <Button
                        color="success"
                        variant="contained"
                        size="medium"
                        href="/todos/create"
                        fullWidth
                    >
                        Create Todo
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};