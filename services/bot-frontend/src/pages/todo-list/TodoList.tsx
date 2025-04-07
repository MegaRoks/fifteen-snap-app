import {useState} from "react";
import {List, Grid, ListItem, ListItemText, Button, Box, Typography, CircularProgress} from "@mui/material";
import {baseApi} from "../../store/api";
import {StatusType} from "./model";
import {Header} from "./components/header";

export function TodoList() {
    const [filterTitle, setFilterTitle] = useState<string>('');
    const {data, isLoading: todoListIsLoading} = baseApi.useGetTodoListQuery({title: filterTitle});

    const todoColor = {
        [StatusType.CANCELLED]: '#FFF1F0',
        [StatusType.COMPLETED]: '#F6FFED',
        [StatusType.IN_PROCESS]: '#E6F7FF',
    };

    const handleSearch = (title: string) => {
        setFilterTitle(title);
    };

    return (
        <Grid container direction="column" spacing={2} my={2}>
            <Grid size={12}>
                <Header onSearch={handleSearch}/>
            </Grid>
            <Grid size={12}>
                {todoListIsLoading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            py: 4,
                        }}
                    >
                        <CircularProgress color="success"/>
                    </Box>
                ) : data && data.length > 0 ? (
                    <List>
                        {data.map((todo) => (
                            <ListItem
                                key={todo.id}
                                sx={{
                                    backgroundColor: todoColor[todo.status],
                                    mb: 1,
                                    borderRadius: 1,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <ListItemText primary={todo.title}/>
                                <Button
                                    color="warning"
                                    variant="contained"
                                    size="small"
                                    href={`/todos/${todo.id}`}
                                >
                                    Details
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Box sx={{p: 2}}>
                        <Typography variant="h6" color="text.secondary">
                            Empty List
                        </Typography>
                    </Box>
                )}
            </Grid>
        </Grid>
    )
}

