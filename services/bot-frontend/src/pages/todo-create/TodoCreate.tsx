import {useNavigate} from "react-router-dom";
import {Button, Card, Form, Input} from "antd";
import {ArrowLeftOutlined} from '@ant-design/icons';
import {baseApi} from "../../store/api";
import {Todo} from "./model";

export function TodoCreate() {
    const navigate = useNavigate();
    const [createTodo, {isLoading: createTodoIsLoading}] = baseApi.useCreateTodoMutation();

    const onFinish = (values: Todo) => {
        createTodo(values);
        navigate(-1);
    };

    const onFinishFailed = (errorInfo: unknown) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Card
            title="Create Todo"
            loading={createTodoIsLoading}
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
                initialValues={{
                    title: '',
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    name="title"
                    rules={[{required: true, message: 'Please input title!'}]}
                >
                    <Input placeholder="Enter title"/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

