import {useNavigate, useParams} from 'react-router-dom';
import {
    Box,
    Card,
    CardHeader,
    CardContent,
    Grid,
    Button,
    TextField,
    Select,
    FormControl,
    MenuItem,
    CircularProgress,
    InputLabel,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useForm, Controller} from 'react-hook-form';
import {baseApi} from '../../store/api';
import {StatusType, Todo} from './model';
import {useEffect} from 'react';

export function TodoDetails() {
    const {todoId} = useParams<{ todoId: string }>() as { todoId: string };
    const navigate = useNavigate();

    const {data, isLoading: todoDetailsIsLoading, refetch: refetchTodoDetails} = baseApi.useGetTodoQuery({id: todoId});
    const [updateTodo, {isLoading: updateTodoIsLoading}] = baseApi.useUpdateTodoMutation();
    const [deleteTodo, {isLoading: deleteTodoIsLoading}] = baseApi.useDeleteTodoMutation();
    const {control, handleSubmit, reset, register} = useForm<Todo>({
        defaultValues: data || {id: '', title: '', status: StatusType.IN_PROCESS},
    });

    const loading = todoDetailsIsLoading || updateTodoIsLoading || deleteTodoIsLoading;

    useEffect(() => {
        if (data) {
            reset(data);
        }
    }, [data, reset]);

    const onSubmit = async (values: Todo) => {
        try {
            await updateTodo(values).unwrap();
            await refetchTodoDetails();
        } catch (error) {
            console.error('Failed to update:', error);
        }
    };

    const onDelete = async () => {
        try {
            await deleteTodo({id: todoId}).unwrap();
            navigate(-1);
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    const todoColor = {
        [StatusType.CANCELLED]: '#FFF1F0',
        [StatusType.COMPLETED]: '#F6FFED',
        [StatusType.IN_PROCESS]: '#E6F7FF',
    };

    return (
        <Card sx={{width: '100%', maxWidth: 600, mx: 'auto', mt: 4, position: 'relative'}}>
            <CardHeader
                title="Todo Details"
                action={
                    <Button
                        startIcon={<ArrowBackIcon/>}
                        onClick={() => navigate(-1)}
                        variant="text"
                    >
                        Back
                    </Button>
                }
            />
            {loading && (
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
                    <CircularProgress color="success"/>
                </Box>
            )}
            <CardContent>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <FormControl fullWidth>
                                <InputLabel id="status-select-label">Status</InputLabel>
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({field}) => (
                                        <Select
                                            labelId="status-select-label"
                                            label="Status"
                                            size="small"
                                            {...field}
                                            sx={{
                                                backgroundColor: todoColor[field.value],
                                            }}
                                        >
                                            <MenuItem value={StatusType.CANCELLED}>Cancel</MenuItem>
                                            <MenuItem value={StatusType.IN_PROCESS}>In Process</MenuItem>
                                            <MenuItem value={StatusType.COMPLETED}>Complete</MenuItem>
                                        </Select>
                                    )}
                                />
                            </FormControl>
                        </Grid>

                        <Grid>
                            <input type="hidden" {...register('id')} />
                        </Grid>

                        <Grid size={12}>
                            <Controller
                                name="title"
                                control={control}
                                rules={{required: 'Please input title!'}}
                                render={({field, fieldState: {error}}) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        size="small"
                                        label="Enter title"
                                        variant="outlined"
                                        error={!!error}
                                        helperText={error ? error.message : ''}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid size={12}>
                            <Grid container spacing={2}>
                                <Grid size={6}>
                                    <Button type="submit" variant="contained" fullWidth>
                                        Save
                                    </Button>
                                </Grid>
                                <Grid size={6}>
                                    <Button variant="contained" color="error" fullWidth onClick={onDelete}>
                                        Delete
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    );
}