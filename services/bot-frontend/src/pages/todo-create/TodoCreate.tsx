import React from 'react';
import {useNavigate} from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Box,
    Button,
    TextField,
    CircularProgress
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {baseApi} from '../../store/api';
import {Todo} from './model';

export function TodoCreate() {
    const navigate = useNavigate();
    const [createTodo, {isLoading: createTodoIsLoading}] = baseApi.useCreateTodoMutation();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const title = formData.get('title') as string;
        if (!title) return;

        try {
            await createTodo({title} as Todo).unwrap();
            navigate(-1);
        } catch (error) {
            console.error('Failed:', error);
        }
    };

    return (
        <Card sx={{width: '100%', maxWidth: 600, mx: 'auto', mt: 4, position: 'relative'}}>
            <CardHeader
                title="Create Todo"
                action={
                    <Button
                        startIcon={<ArrowBackIcon fontSize="small"/>}
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </Button>
                }
            />
            {createTodoIsLoading && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        bgcolor: 'rgba(255,255,255,0.7)',
                        zIndex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <CircularProgress/>
                </Box>
            )}
            <CardContent>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{mt: 1}}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Enter title"
                        name="title"
                        defaultValue=""
                        size="small"
                    />
                    <CardActions sx={{p: 0, mt: 2}}>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={createTodoIsLoading}
                        >
                            Save
                        </Button>
                    </CardActions>
                </Box>
            </CardContent>
        </Card>
    );
}