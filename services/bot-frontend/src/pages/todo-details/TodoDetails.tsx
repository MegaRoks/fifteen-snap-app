import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, Col, Form, Input, Radio, Row} from "antd";
import {ArrowLeftOutlined} from '@ant-design/icons';
import {baseApi} from "../../store/api";
import {StatusType, Todo} from "./model";

export function TodoDetails() {
    const {todoId} = useParams() as { todoId: string };
    const navigate = useNavigate();
    const {data, isLoading: todoDetailsIdLoading, refetch: refetchTodoDetails} = baseApi.useGetTodoQuery({id: todoId});
    const [updateTodo, {isLoading: updateTodoIsLoading}] = baseApi.useUpdateTodoMutation();
    const [deleteTodo, {isLoading: deleteTodoIsLoading}] = baseApi.useDeleteTodoMutation();

    const onFinish = (values: Todo) => {
        updateTodo(values);
        refetchTodoDetails();
    };

    const onFinishFailed = (errorInfo: unknown) => {
        console.log('Failed:', errorInfo);
    };

    const onDelete = () => {
        deleteTodo({id: todoId});
        navigate(-1);
    }

    const todoColor = {
        [StatusType.CANCELLED]: '#FFF1F0',
        [StatusType.COMPLETED]: '#F6FFED',
        [StatusType.IN_PROCESS]: '#E6F7FF',
    };

    return (
        <Card
            title="Todo Details"
            loading={todoDetailsIdLoading || updateTodoIsLoading || deleteTodoIsLoading}
            extra={
                <Button
                    type="link"
                    icon={<ArrowLeftOutlined style={{fontSize: '16px'}}/>}
                    onClick={() => navigate(-1)}
                >
                    Back
                </Button>
            }
            style={{width: '100%', maxWidth: '600px', margin: '0 auto'}}
        >
            <Form
                name="todo"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{width: "100%"}}
                initialValues={data}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item name="status">
                    <Radio.Group value={StatusType}>
                        <Radio.Button
                            value={StatusType.CANCELLED}
                            style={{backgroundColor: todoColor[StatusType.CANCELLED], color: 'black'}}
                        >
                            Cancel
                        </Radio.Button>
                        <Radio.Button
                            value={StatusType.IN_PROCESS}
                            style={{backgroundColor: todoColor[StatusType.IN_PROCESS], color: 'black'}}
                        >
                            In Process
                        </Radio.Button>
                        <Radio.Button
                            value={StatusType.COMPLETED}
                            style={{backgroundColor: todoColor[StatusType.COMPLETED], color: 'black'}}
                        >
                            Complete
                        </Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item name="id" noStyle hidden>
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="title"
                    rules={[{required: true, message: 'Please input title!'}]}
                >
                    <Input placeholder="Enter title"/>
                </Form.Item>

                <Form.Item>
                    <Row>
                        <Col span={12}>
                            <Button type="primary" htmlType="submit">
                                Save
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button type="primary" danger onClick={onDelete}>
                                Delete
                            </Button>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
        </Card>
    )
}

