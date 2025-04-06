import {Card, List, Typography} from "antd";
import {baseApi} from "../../store/api";
import {StatusType} from "./model";
import {Header} from "./components/Header.tsx";
import {useState} from "react";

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
        <List
            header={<Header onSearch={handleSearch}/>}
            footer={<div>Footer</div>}
            bordered
            loading={todoListIsLoading}
            dataSource={data}
            style={{width: '100%', maxWidth: '800px', margin: '0 auto'}}
            renderItem={(todo) => (
                <List.Item style={{width: '100%'}}>
                    <Typography.Link href={`/todos/${todo.id}`} style={{width: '100%'}}>
                        <Card style={{width: '100%', backgroundColor: todoColor[todo.status]}}>
                            <Typography.Title level={4} style={{color: 'black', margin: 0}}>
                                {todo.title}
                            </Typography.Title>
                        </Card>
                    </Typography.Link>
                </List.Item>
            )}
        />
    )
}

